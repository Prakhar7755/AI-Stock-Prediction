import "./src/config/env.js";
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import helmet from "helmet";

import startServer from "./src/server.js";
import errorHandler from "./src/middlewares/errorHandler.js";
import infoRoutes from "./src/routes/info.routes.js";

const app = express();
const PORT = process.env.PORT || 5001;

// Get directory name from ES module context
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const clientPath = path.join(__dirname, "../client/dist"); // for local development or deployment without docker

// ---------------------------
// Global Middleware Setup
// ---------------------------
app.use(express.json({ limit: "400kb" }));
app.use(express.urlencoded({ extended: true, limit: "400kb" }));
app.use(
  helmet({
    hsts: {
      maxAge: 63072000, // 2 years in seconds
      includeSubDomains: true,
      preload: true,
    },
  })
);

// ---------------------------
// CORS Setup (Dev Only)
// ---------------------------
const allowedOrigins = [
  "http://localhost:5173", // client
  "http://localhost:5001", // server
  process.env.ML_SERVICE_URL, // ml-service(python)
  process.env.CORS_ORIGIN,
].filter(Boolean);

if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
          callback(null, true);
        } else {
          callback(new Error("Not allowed by CORS"));
        }
      },
      credentials: true,
    })
  );
}

// ---------------------------
// API Route Handlers
// ---------------------------

app.get("/api/health", (req, res) => res.json({ status: "OK" })); // health check
app.use("/api", infoRoutes);

// ---------------------------
// Serve Static Frontend Assets (Production)
// ---------------------------
if (process.env.NODE_ENV === "production") {
  app.use(express.static(clientPath));

  app.get("*", (req, res) => {
    res.sendFile(path.join(clientPath, "index.html"));
  });
}

// ---------------------------
// Centralized Error Handling
// ---------------------------
app.use(errorHandler);

// ---------------------------
// Start Server
// ---------------------------
startServer(app, PORT);
