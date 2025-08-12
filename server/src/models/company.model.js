import { Schema, model, models } from "mongoose";

const companySchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    symbol: { type: String, required: true, unique: true, trim: true },
  },
  {
    timestamps: true,
  }
);

export const CompanyModel = models.Company || model("Company", companySchema);
