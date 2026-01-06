const express = require("express");
const router = express.Router();
const db = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Helper: normalize email
const normalizeEmail = (email) => email?.toLowerCase().trim();

// Helper: validate password strength
const isStrongPassword = (password) => {
  return typeof password === "string" && password.length >= 6;
};

// =======================
// ✅ Signup route
// =======================
router.post("/signup", async (req, res) => {
  try {
    let { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: "All fields are required." });
    }

    email = normalizeEmail(email);
    name = name.trim();

    if (!isStrongPassword(password)) {
      return res.status(400).json({ error: "Password must be at least 6 characters." });
    }

    // Check if email already exists
    const [existing] = await db.execute("SELECT id FROM users WHERE email = ?", [email]);
    if (existing.length > 0) {
      return res.status(409).json({ error: "Email already registered." });
    }

    // Hash password
    const hashed = await bcrypt.hash(password, 10);

    // Insert new user
    const [result] = await db.execute(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, hashed]
    );

    console.log(`✅ New user registered: ${email}`);

    res.status(201).json({
      message: "Signup successful.",
      userId: result.insertId,
      user: { id: result.insertId, name, email },
    });
  } catch (err) {
    console.error("❌ Signup error:", err);
    res.status(500).json({ error: "Server error during signup." });
  }
});

// =======================
// ✅ Login route
// =======================
router.post("/login", async (req, res) => {
  try {
    let { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required." });
    }

    email = normalizeEmail(email);

    // Debug logs
    console.log("🔍 Login attempt email:", email);

    const [rows] = await db.execute("SELECT * FROM users WHERE email = ?", [email]);
    console.log("🔍 DB rows returned:", rows);

    const user = rows[0];

    if (!user) {
      console.warn(`⚠️ Login failed: no user found for ${email}`);
      return res.status(404).json({ error: "No user registered with this email. Please sign up first." });
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      console.warn(`⚠️ Login failed: invalid password for ${email}`);
      return res.status(401).json({ error: "Invalid credentials." });
    }

    // ✅ Generate JWT with user info
    const token = jwt.sign(
      { id: user.id, email: user.email, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    console.log(`✅ Login successful for ${email}`);

    // ✅ Return token + user object
    res.status(200).json({
      message: "Login successful.",
      token,
      user: {
        id: user.id,
        name: user.name,   // <-- critical for frontend header
        email: user.email,
      },
    });
  } catch (err) {
    console.error("❌ Login error:", err);
    res.status(500).json({ error: "Server error during login." });
  }
});

module.exports = router;