// routes/contact.js
const express = require("express");
const router = express.Router();
const db = require("../db");

// Submit contact form
router.post("/", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: "Name, email, and message are required" });
    }

    await db.execute(
      "INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)",
      [name, email, message]
    );

    res.json({ message: "Message received successfully" });
  } catch (err) {
    console.error("Contact insert error:", err);
    res.status(500).json({ error: "Failed to submit contact form" });
  }
});

// Get all contact messages (admin view)
router.get("/", async (req, res) => {
  try {
    const [rows] = await db.execute("SELECT * FROM contacts ORDER BY created_at DESC");
    res.json(rows);
  } catch (err) {
    console.error("Contact fetch error:", err);
    res.status(500).json({ error: "Failed to fetch contact messages" });
  }
});

module.exports = router;