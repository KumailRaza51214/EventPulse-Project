const express = require("express");
const router = express.Router();
const db = require("../db");

// ✅ Get all events
router.get("/", async (req, res) => {
  try {
    const [rows] = await db.execute("SELECT * FROM events");
    res.json(rows);
  } catch (err) {
    console.error("❌ Error fetching events:", err.message);
    res.status(500).json({ error: "Failed to fetch events" });
  }
});

// ✅ RSVP confirm (with name + email)
router.post("/:eventId/rsvp", async (req, res) => {
  try {
    const { userId, name, email } = req.body;
    const eventId = req.params.eventId;

    console.log("RSVP confirm request:", { userId, name, email, eventId });

    if (!userId || !name || !email) {
      return res.status(400).json({ error: "User ID, name, and email are required" });
    }

    await db.execute(
      "INSERT INTO event_rsvp (user_id, event_id, name, email) VALUES (?, ?, ?, ?)",
      [userId, eventId, name, email]
    );

    res.json({ message: "RSVP confirmed successfully." });
  } catch (err) {
    console.error("❌ RSVP error:", err.message);
    res.status(500).json({ error: "Failed to RSVP" });
  }
});

// ✅ RSVP cancel (POST endpoint)
router.post("/:eventId/rsvp/cancel", async (req, res) => {
  try {
    const { userId } = req.body;
    const eventId = req.params.eventId;

    console.log("RSVP cancel request:", { userId, eventId });

    if (!userId) {
      return res.status(400).json({ error: "User ID required" });
    }

    const [result] = await db.execute(
      "DELETE FROM event_rsvp WHERE user_id = ? AND event_id = ?",
      [userId, eventId]
    );

    console.log("RSVP cancel SQL result:", result);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "No RSVP found to cancel." });
    }

    res.json({ message: "RSVP cancelled successfully." });
  } catch (err) {
    console.error("❌ Cancel RSVP error:", err.message);
    res.status(500).json({ error: "Failed to cancel RSVP" });
  }
});

module.exports = router;