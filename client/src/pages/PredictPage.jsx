import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import api from "../lib/axios.js";
import "../lib/chartjsSetup.js"; // Ensure Chart.js scales & elements are registered

const PredictPage = () => {
  const [selectedCompany, setSelectedCompany] = useState("");
  const [symbol, setSymbol] = useState("");
  const [customCompany, setCustomCompany] = useState("");
  const [customSymbol, setCustomSymbol] = useState("");
  const [period1, setPeriod1] = useState("");
  const [period2, setPeriod2] = useState(
    new Date(Date.now() - 86400000).toISOString().split("T")[0]
  );
  const [analysisResult, setAnalysisResult] = useState(null);
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [method, setMethod] = useState("linear-regression");
  const [companies, setCompanies] = useState([]);
  const [companiesLoading, setCompaniesLoading] = useState(true);

  // Fetch all companies
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const res = await api.get("/company");
        const json = res.data;
        if (json.success && Array.isArray(json.companies)) {
          setCompanies(json.companies);
        } else {
          console.warn("Failed to load companies:", json.message);
        }
      } catch (err) {
        console.error(
          "Error fetching companies:",
          err.response?.data?.message || err.message
        );
      } finally {
        setCompaniesLoading(false);
      }
    };
    fetchCompanies();
  }, []);

  // Handle company dropdown
  const handleCompanyChange = (e) => {
    const value = e.target.value;
    setSelectedCompany(value);
    if (value === "__custom__") {
      setSymbol("");
    } else {
      const selected = companies.find((c) => c.name === value);
      setSymbol(selected?.symbol || "");
    }
  };

  // Core analysis
  const handleAnalyze = async () => {
    const companyName =
      selectedCompany === "__custom__" ? customCompany.trim() : selectedCompany;
    const companySymbol =
      selectedCompany === "__custom__"
        ? customSymbol.trim().toUpperCase()
        : symbol;

    if (!companyName || !companySymbol || !period1 || !period2) {
      alert("Please fill in all fields correctly.");
      return;
    }
    if (new Date(period1) >= new Date(period2)) {
      alert("Start date must be before end date.");
      return;
    }
    if (new Date(period2) > new Date()) {
      alert("End date cannot be in the future.");
      return;
    }

    setLoading(true);
    setAnalysisResult(null);
    setChartData(null);

    try {
      // Save custom company to DB
      if (selectedCompany === "__custom__") {
        const alreadyExists = companies.some(
          (c) =>
            c.name.trim().toLowerCase() === companyName.toLowerCase() ||
            c.symbol.toUpperCase() === companySymbol.toUpperCase()
        );
        if (!alreadyExists) {
          try {
            const saveRes = await api.post("/company", {
              name: companyName,
              symbol: companySymbol,
            });
            const saveJson = saveRes.data;
            if (saveJson.success && saveJson.data) {
              setCompanies((prev) => [...prev, saveJson.data]);
            }
          } catch (saveErr) {
            console.error("Error saving company:", saveErr);
          }
        }
      }

      // Fetch historical stock data
      const stockRes = await api.post("/stock", {
        name: companyName,
        symbol: companySymbol,
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
        alert("No historical data found for the given period.");
        return;
      }

      const labels = historicalData.map((entry) => entry.date);
      const closePrices = historicalData.map((entry) =>
        Number(entry.close.toFixed(2))
      );

      // Get prediction
      const predictRes = await api.post("/predict", {
        symbol: companySymbol,
        data: historicalData,
        method,
      });
      const predictJson = predictRes.data;
      if (
        !predictJson.success ||
        predictJson.predictedPrice == null ||
        isNaN(predictJson.predictedPrice)
      ) {
        alert(predictJson.message || "Prediction failed.");
        return;
      }

      // Add predicted value
      const lastDate = new Date(labels[labels.length - 1]);
      lastDate.setDate(lastDate.getDate() + 1);
      const predictedDate = lastDate.toISOString().split("T")[0];

      const updatedLabels = [...labels, predictedDate];
      const updatedPrices = [...closePrices, predictJson.predictedPrice];

      // Update chart
      setChartData({
        labels: updatedLabels,
        datasets: [
          {
            label: "Close Price",
            data: updatedPrices,
            borderColor: "#3b82f6",
            backgroundColor: "rgba(59, 130, 246, 0.1)",
            fill: false,
            tension: 0.3,
            pointBackgroundColor: updatedPrices.map((_, idx) =>
              idx === updatedPrices.length - 1 ? "#ef4444" : "#3b82f6"
            ),
          },
        ],
      });

      setAnalysisResult(
        `Predicted price for ${companyName} (${companySymbol}) on ${predictedDate} → ${predictJson.predictedPrice}`
      );
    } catch (err) {
      console.error("Error during analysis:", err);
      alert("Prediction failed. Check backend service or health endpoint.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setAnalysisResult(null);
    setChartData(null);
  }, [selectedCompany, customCompany, customSymbol, period1, period2]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8 text-center text-primary">
        Predict Stock Prices
      </h1>

      <div className="grid gap-6">
        {/* Company Selector */}
        <div>
          <label className="label">
            <span className="label-text">Select Company</span>
          </label>
          <select
            className="select select-bordered w-full"
            value={selectedCompany}
            onChange={handleCompanyChange}
            disabled={companiesLoading}
          >
            <option disabled value="">
              {companiesLoading
                ? "Loading companies..."
                : "-- Choose a company --"}
            </option>
            {companies.map((company) => (
              <option key={company._id} value={company.name}>
                {company.name}
              </option>
            ))}
            <option value="__custom__">Other (Enter manually)</option>
          </select>
        </div>

        {/* Custom Company Input */}
        {selectedCompany === "__custom__" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="label">
                <span className="label-text">Company Name</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full"
                value={customCompany}
                onChange={(e) => setCustomCompany(e.target.value)}
                placeholder="e.g., MyStartup Inc."
              />
            </div>
            <div>
              <label className="label">
                <span className="label-text">Company Symbol</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full uppercase"
                value={customSymbol}
                onChange={(e) => setCustomSymbol(e.target.value.toUpperCase())}
                placeholder="e.g., MSTP"
              />
            </div>
          </div>
        ) : (
          <div>
            <label className="label">
              <span className="label-text">Company Symbol</span>
            </label>
            <input
              type="text"
              className="input input-bordered w-full"
              value={symbol}
              readOnly
            />
          </div>
        )}

        {/* Prediction Method */}
        <div>
          <label className="label">
            <span className="label-text">Prediction Method</span>
          </label>
          <select
            className="select select-bordered w-full"
            value={method}
            onChange={(e) => setMethod(e.target.value)}
          >
            <option value="linear-regression">Linear Regression</option>
            <option value="average">Average</option>
            <option value="polynomial-regression">Polynomial Regression</option>
          </select>
        </div>

        {/* Date Range */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="label">
              <span className="label-text">Start Date</span>
            </label>
            <input
              type="date"
              className="input input-bordered w-full"
              value={period1}
              onChange={(e) => setPeriod1(e.target.value)}
            />
          </div>
          <div>
            <label className="label">
              <span className="label-text">End Date</span>
            </label>
            <input
              type="date"
              className="input input-bordered w-full"
              value={period2}
              onChange={(e) => setPeriod2(e.target.value)}
            />
          </div>
        </div>

        {/* Analyze Button */}
        <div className="text-center mt-4">
          <button
            className="btn btn-primary btn-wide"
            onClick={handleAnalyze}
            disabled={
              loading ||
              !period1 ||
              !period2 ||
              (selectedCompany === "__custom__"
                ? !customCompany || !customSymbol
                : !symbol)
            }
          >
            {loading ? (
              <>
                <span className="loading loading-spinner loading-sm"></span>{" "}
                Analyzing...
              </>
            ) : (
              "Analyze"
            )}
          </button>
        </div>
      </div>

      {/* Loading */}
      {loading && (
        <div className="mt-6 text-center">
          <span className="loading loading-spinner text-primary loading-lg"></span>
          <p className="mt-4 text-base-content">Processing...</p>
        </div>
      )}

      {/* Result */}
      {analysisResult && (
        <div className="mt-10 text-center text-lg text-base-content/80">
          {analysisResult}
        </div>
      )}

      {/* Chart */}
      {chartData && (
        <div className="mt-10 bg-base-200 p-6 rounded-box">
          <Line
            key={chartData.labels.join("-")} // unique key to avoid canvas reuse
            data={chartData}
            options={{
              responsive: true,
              plugins: {
                legend: { position: "top" },
                title: { display: true, text: "Stock Price Prediction" },
              },
              scales: {
                x: { type: "category" },
                y: { beginAtZero: false },
              },
            }}
          />
        </div>
      )}

      {/* No chart placeholder */}
      {!chartData && !loading && !analysisResult && (
        <div className="mt-10 text-center text-base-content/60">
          Start by selecting a company and date range to predict stock prices.
          <a
            className="text-red-700 font-bold"
            href="https://ai-stock-prediction-ml-service-1.onrender.com/health"
          >
            {" "}
            CLICK HERE FOR ANY ERROR
          </a>
        </div>
      )}
    </div>
  );
};

export default PredictPage;
