import { CompanyModel } from "../models/company.model.js";

const getAllCompanies = async (req, res) => {
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

const setCompanyInfo = async (req,res) => {

  
};
const updateCompanyInfo = async (req,res) => {

  
};
const getStockData = async (req,res) => {

  
};
const getCompanyInfoById = async (req,res) => {

  
};
const handlePrediction = async (req,res) => {

  
};

export {
  getAllCompanies,
  setCompanyInfo,
  updateCompanyInfo,
  getStockData,
  handlePrediction,
  getCompanyInfoById,
};
