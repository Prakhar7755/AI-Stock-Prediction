import express from "express";
import {
  getAllCompanies,
  // getCompanyInfoById,
  setCompanyRecord,
  updateCompanyInfoById,
  getStockData,
  handlePrediction,
} from "../controllers/companyInfo.controller.js";

const router = express.Router();

router.route("/company").get(getAllCompanies).post(setCompanyRecord);
router.route("/company/:id").put(updateCompanyInfoById);

// stock data
router.post("/stock", getStockData);
router.post("/predict", handlePrediction);

export default router;
