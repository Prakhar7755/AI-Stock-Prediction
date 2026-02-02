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

      // 4. update chart data
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
    <div className="max-w-6xl mx-auto px-4 py-10 space-y-8">
      <div className="text-center">
        <div className="badge badge-primary badge-outline mb-2">
          Market Analysis
        </div>
        <h1 className="text-4xl font-black text-base-content">
          {companyName}{" "}
          <span className="text-base-content/40 text-2xl font-normal">
            ({symbol})
          </span>
        </h1>
      </div>

      {loading && (
        <div className="flex justify-center py-20">
          <span className="loading loading-bars loading-lg text-primary"></span>
        </div>
      )}

      {!loading && analysisResult && (
        <div className="alert alert-info shadow-lg max-w-2xl mx-auto">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="stroke-current shrink-0 w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <span className="font-medium">{analysisResult}</span>
        </div>
      )}

      {!loading && chartData && (
        <div className="card bg-base-100 shadow-xl border border-base-200">
          <div className="card-body p-4 sm:p-8">
            <Line data={chartData} />
          </div>
        </div>
      )}
    </div>
  );
};

export default SelectedCompanyPage;
