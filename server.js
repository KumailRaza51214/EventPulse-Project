const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
require("dotenv").config(); // Load env first

const app = express();
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || "http://localhost:5173";
const PORT = process.env.PORT || 5000;

// Security headers
app.use(helmet());

// CORS with credentials
app.use(cors({ origin: FRONTEND_ORIGIN, credentials: true }));

// Logging
app.use(morgan("dev"));

// JSON parsing
app.use(express.json());

// Health + readiness endpoints
app.get("/", (req, res) => {
  res.json({ message: "EventPulse backend is running 🚀", version: "v1" });
});
app.get("/healthz", (req, res) => res.status(200).send("ok"));
app.get("/readyz", (req, res) => res.status(200).send("ready"));

// Routes (import safely, log if missing)
try {
  const authRoutes = require("./routes/auth");
  app.use("/api/auth", authRoutes);
} catch (err) {
  console.warn("⚠️ Auth routes not loaded:", err.message);
}

try {
  const eventRoutes = require("./routes/events");
  app.use("/api/events", eventRoutes);
} catch (err) {
  console.warn("⚠️ Event routes not loaded:", err.message);
}

try {
  const volunteerRoutes = require("./routes/volunteer");
  app.use("/api/volunteer", volunteerRoutes);
} catch (err) {
  console.warn("⚠️ Volunteer routes not loaded:", err.message);
}

try {
  const contactRoutes = require("./routes/contact");
  app.use("/api/contact", contactRoutes);
} catch (err) {
  console.warn("⚠️ Contact routes not loaded:", err.message);
}

// 404 for unknown API routes
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Centralized error handler (last)
app.use((err, req, res, next) => {
  console.error("❌ Server error:", err);
  res.status(500).json({ error: "Internal server error" });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
  console.log(`🔗 Allowed CORS origin: ${FRONTEND_ORIGIN}`);
});