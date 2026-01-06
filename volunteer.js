const express = require("express");
const router = express.Router();
const db = require("../db");
const nodemailer = require("nodemailer");
require("dotenv").config();

// POST /api/volunteer
router.post("/", async (req, res) => {
  const { name, email, interest } = req.body;

  // Validate inputs
  if (!name || !email || !interest) {
    return res.status(400).json({ error: "Name, email, and interest are required." });
  }

  console.log("📩 Volunteer request:", { name, email, interest });

  // Insert into DB
  try {
    await db.execute(
      "INSERT INTO volunteers (name, email, interest, created_at) VALUES (?, ?, ?, NOW())",
      [name, email, interest]
    );
    console.log("✅ Volunteer saved to DB");
  } catch (dbErr) {
    console.error("❌ Database insert error:", dbErr);
    return res.status(500).json({ error: "Database insert failed." });
  }

  // Check email credentials
  const { EMAIL_USER, EMAIL_PASS } = process.env;
  if (!EMAIL_USER || !EMAIL_PASS) {
    console.error("❌ Missing EMAIL_USER or EMAIL_PASS in .env");
    return res.status(500).json({ error: "Volunteer saved but email configuration missing." });
  }

  // Configure Nodemailer (Gmail)
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS, // Must be Google App Password if 2FA is on
    },
  });

  const mailOptions = {
    from: `EventPulse <${EMAIL_USER}>`,
    to: email,
    subject: "Thank You for Volunteering!",
    text: `Dear ${name},

Thank you for being a volunteer with EventPulse Community Manager.
We appreciate your interest in "${interest}" and look forward to working with you!

Warm regards,
EventPulse Team`,
  };

  // Send email
  try {
    await transporter.sendMail(mailOptions);
    console.log("✅ Confirmation email sent to:", email);
  } catch (emailErr) {
    console.error("❌ Email send error:", emailErr);
    return res.status(500).json({ error: "Volunteer saved but failed to send email." });
  }

  return res.json({ message: "Volunteer registered successfully. Thank-you email sent!" });
});

// GET /api/volunteer
router.get("/", async (req, res) => {
  try {
    const [rows] = await db.execute("SELECT * FROM volunteers ORDER BY created_at DESC");
    res.json(rows);
  } catch (err) {
    console.error("❌ Volunteer fetch error:", err);
    res.status(500).json({ error: "Failed to fetch volunteers." });
  }
});

module.exports = router;