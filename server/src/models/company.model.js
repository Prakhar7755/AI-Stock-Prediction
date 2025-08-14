import mongoose from "mongoose";

const companySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    symbol: { type: String, required: true, unique: true, trim: true },
  },
  {
    timestamps: true,
  }
);

export const CompanyModel =
  mongoose.models.Company || mongoose.model("Company", companySchema);
