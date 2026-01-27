import dotenv from "dotenv";


if (process.env.NODE_ENV !== "production") {
  dotenv.config(); // only load .env locally
}

// Now all variables are available via process.env
export const PORT = process.env.PORT || 5001;
export const DATABASE_URI = process.env.DATABASE_URI;
export const ML_SERVICE_URL = process.env.ML_SERVICE_URL;
export const CORS_ORIGIN = process.env.CORS_ORIGIN;