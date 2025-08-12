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
router.get("/stock", getStockData);
router.get("/predict/:symbol", handlePrediction);

export default router;
