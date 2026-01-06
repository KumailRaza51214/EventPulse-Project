require("dotenv").config();
const mysql = require("mysql2/promise");

// MySQL connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "eventpulse",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Test connection at startup
(async () => {
  try {
    const conn = await pool.getConnection();
    console.log("✅ MySQL connected to:", conn.config.database);
    conn.release();
  } catch (err) {
    console.error("❌ MySQL connection failed:", err.message);
  }
})();

module.exports = pool;