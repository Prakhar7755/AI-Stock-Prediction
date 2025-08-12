import "./src/config/env.js";
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import startServer from "./server.js";
import errorHandler from "./src/middlewares/errorHandler.js";
import infoRoutes from "./src/routes/info.routes.js"

const app = express();
const PORT = process.env.PORT || 5001;

// Get directory name from ES module context
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const clientPath = path.join(__dirname, "../client/dist");

// ---------------------------
// Global Middleware Setup
// ---------------------------
app.use(express.json({ limit: "400kb" }));
app.use(express.urlencoded({ extended: true, limit: "400kb" }));

// ---------------------------
// CORS Setup (Dev Only)
// ---------------------------
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5001",
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

app.use("/api",infoRoutes)

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
