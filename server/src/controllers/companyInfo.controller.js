import mongoose from "mongoose";
import axios from "axios";

import { CompanyModel } from "../models/company.model.js";
import { getHistoricalData } from "../utils/getHistoricalData.js";

const getAllCompanies = async (_, res) => {
  try {
    const companies = await CompanyModel.find();

    if (companies.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No companies found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Companies list fetched successfully.",
      companies,
    });
  } catch (err) {
    console.error("🔥 Error while fetching the companies:", err.message);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error. Please try again later.",
      ...(process.env.NODE_ENV !== "production" && { error: err.message }),
    });
  }
};

const setCompanyRecord = async (req, res) => {
  try {
    const { name, symbol } = req.body;

    if (!name?.trim() || !symbol?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Name and Symbol both are required.",
      });
    }

    const newRecord = await CompanyModel.create({ name, symbol });

    console.log("✅ New company record created:", newRecord.name);

    return res.status(201).json({
      success: true,
      message: "New company record created.",
      data: newRecord,
    });
  } catch (err) {
    console.error("🔥 Error creating the company record:", err.message);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error. Please try again later.",
      ...(process.env.NODE_ENV !== "production" && { error: err.message }),
    });
  }
};

const updateCompanyInfoById = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, symbol } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid company ID format.",
      });
    }

    if (!name?.trim() || !symbol?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Name and Symbol both are required.",
      });
    }

    const updatedData = await CompanyModel.findByIdAndUpdate(
      id,
      { name, symbol },
      { new: true }
    );

    if (!updatedData) {
      return res.status(404).json({
        success: false,
        message: "Company not found. Update failed.",
      });
    }

    console.log("✅ Company data successfully updated:", updatedData);

    return res.status(200).json({
      success: true,
      message: "Company details updated successfully.",
      data: updatedData,
    });
  } catch (err) {
    console.error("🔥 Error updating the company record:", err.message);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error. Please try again later.",
      ...(process.env.NODE_ENV !== "production" && { error: err.message }),
    });
  }
};

const getStockData = async (req, res) => {
  try {
    const { name, symbol, period1, period2 } = req.body;

    if (!name || !symbol || !period1 || !period2) {
      return res.status(400).json({
        success: false,
        message: "Name, Symbol, Period 1 & 2 are all required.",
      });
    }

    const data = await getHistoricalData(symbol, period1, period2);

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "No stock data found for the given period.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Stock data fetched successfully.",
      symbol,
      data,
    });
  } catch (err) {
    console.error(
      "🔥 Failed to get the stock data from yahoo-finance2:",
      err.message
    );
    return res.status(500).json({
      success: false,
      message: "Internal Server Error. Please try again later.",
      ...(process.env.NODE_ENV !== "production" && { error: err.message }),
    });
  }
};

const handlePrediction = async (req, res) => {
  try {
    const { symbol, data = [], method = "linear-regression" } = req.body;

    if (!symbol || !Array.isArray(data) || data.length < 3) {
      return res.status(400).json({
        success: false,
        message: "Symbol and at least 2 days of stock data are required.",
      });
    }

    // Extract closing prices from historical data
    const closingPrices = data
      .map((entry) => entry?.close)
      .filter((price) => typeof price === "number");

    if (closingPrices.length < 3) {
      return res.status(400).json({
        success: false,
        message: "Not enough valid closing prices in the dataset.",
      });
    }

    // Send to Flask AI service
    const response = await axios.post("http://localhost:5002/predict", {
      prices: closingPrices,
      method,
    });

    const predictedPrice = response.data.predicted_price;

    return res.status(200).json({
      success: true,
      symbol,
      predictedPrice,
    });
  } catch (err) {
    console.error("🔥 Prediction error:", err.message);
    return res.status(500).json({
      success: false,
      message: "Failed to generate prediction.",
      ...(process.env.NODE_ENV !== "production" && { error: err.message }),
    });
  }
};

export {
  getAllCompanies,
  setCompanyRecord,
  updateCompanyInfoById,
  getStockData,
  handlePrediction,
};
