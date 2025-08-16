import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Line } from "react-chartjs-2";
import api from "../lib/axios";

const SelectedCompanyPage = () => {
  const [searchParams] = useSearchParams();
  const symbol = searchParams.get("symbol");
  const companyName = searchParams.get("name");

  const [chartData, setChartData] = useState(null);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [loading, setLoading] = useState(true);

  // Default to last 30 days
  const period2 = new Date().toISOString().split("T")[0];
  const period1 = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) // 30 days ago
    .toISOString()
    .split("T")[0];

  // fetch data
  const fetchData = useCallback(async () => {
    if (!companyName || !symbol) {
      alert("Name and Symbol are required.");
      return;
    }

    try {
      setLoading(true);

      // 1. Fetch stock data
      const stockRes = await api.post("/stock", {
        name: companyName,
        symbol,
        period1,
        period2,
      });

      const stockJson = stockRes.data;

      if (!stockJson.success || !Array.isArray(stockJson.data)) {
        alert(stockJson.message || "Failed to fetch stock data.");
        return;
      }

      const historicalData = stockJson.data;

      if (historicalData.length === 0) {
        alert("No data found.");
        return;
      }

      // 2. Get prediction
      const predictRes = await api.post("/predict", {
        symbol,
        data: historicalData,
        method: "linear-regression", // or "average"
      });

      const predictJson = predictRes.data;

      if (!predictJson.success || !predictJson.predictedPrice) {
        alert("Prediction failed DUE TO PYTHON/FLASK deployment");
        return;
      }

      // 3. Build chart
      const labels = historicalData.map((entry) => entry.date);
      const closePrices = historicalData.map((entry) =>
        parseFloat(entry.close.toFixed(2))
      );

      const lastDate = new Date(labels[labels.length - 1]);
      lastDate.setDate(lastDate.getDate() + 1);
      const predictedDate = lastDate.toISOString().split("T")[0];

      labels.push(predictedDate);
      closePrices.push(predictJson.predictedPrice);

      setChartData({
        labels,
        datasets: [
          {
            label: `Close Price at ${predictJson.predictedPrice}`,
            data: closePrices,
            borderColor: "#3b82f6",
            backgroundColor: "rgba(59, 130, 246, 0.1)",
            tension: 0.4,
            pointBackgroundColor: closePrices.map((_, i) =>
              i === closePrices.length - 1 ? "#ef4444" : "#3b82f6"
            ),
          },
        ],
      });

      setAnalysisResult(
        `Predicted price for ${companyName} (${symbol}) on ${predictedDate} ::: ${predictJson.predictedPrice}`
      );
    } catch (err) {
      console.error(err);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }, [companyName, symbol, period1, period2]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6 text-center text-primary">
        Stock Analysis
      </h1>

      {loading && <p className="text-center">Loading...</p>}

      {!loading && analysisResult && (
        <div className="text-center mb-6">{analysisResult}</div>
      )}

      {!loading && chartData && (
        <div className="bg-base-200 p-6 rounded-box">
          <Line data={chartData} />
        </div>
      )}
    </div>
  );
};

export default SelectedCompanyPage;
