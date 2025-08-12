import express from "express";
import {
  getAllCompanies,
  getCompanyInfoById,
  setCompanyInfo,
  updateCompanyInfo,
  getStockData,
  handlePrediction,
} from "../controllers/companyInfo.controller.js";

const router = express.Router();

router.get("/company", getAllCompanies);
router.post("/company", setCompanyInfo);
router.get("/company/:id", getCompanyInfoById);
router.put("/company/:id", updateCompanyInfo);
router.get("/stock/:symbol", getStockData);
router.get("/predict/:symbol", handlePrediction);

export default router;
