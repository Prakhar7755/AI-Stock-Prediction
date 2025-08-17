import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

const CompanyModel = sequelize.define("Company", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  symbol: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
}, {
  timestamps: true, 
});

export { CompanyModel };
