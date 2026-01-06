import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Events() {
  const [events, setEvents] = useState([]);
  const [rsvpStatus, setRsvpStatus] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Read profile from localStorage (multiple key conventions)
  const getStoredProfile = () => {
    let userId =
      localStorage.getItem("userId") ||
      localStorage.getItem("id") ||
      localStorage.getItem("user_id");

    let name =
      localStorage.getItem("name") ||
      localStorage.getItem("username") ||
      localStorage.getItem("fullName");

    let email =
      localStorage.getItem("email") ||
      localStorage.getItem("userEmail") ||
      localStorage.getItem("mail");

    // Try JSON-packed user objects
    const possibleUserKeys = ["user", "authUser", "currentUser", "profile"];
    for (const key of possibleUserKeys) {
      if (userId && name && email) break;
      const raw = localStorage.getItem(key);
      if (!raw) continue;
      try {
        const obj = JSON.parse(raw);
        userId = userId || obj.id || obj.user_id;
        name = name || obj.name || obj.username || obj.fullName;
        email = email || obj.email || obj.userEmail;
      } catch { /* empty */ }
    }

    return {
      userId: userId ? String(userId).trim() : null,
      name: name ? String(name).trim() : null,
      email: email ? String(email).trim() : null,
      token: localStorage.getItem("token") || null,
    };
  };

  // Ensure we have name/email; try backend, then prompt user
  const ensureProfile = async () => {
    let { userId, name, email, token } = getStoredProfile();

    if (!userId) return { userId: null, name: null, email: null }; // must log in

    // If name/email already present, done
    if (name && email) return { userId, name, email };

    // Try fetching from backend using token
    if (token) {
      try {
        const res = await axios.get("http://localhost:5000/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const me = res.data?.user || res.data;
        const fetchedName = me?.name || me?.username || me?.fullName || null;
        const fetchedEmail = me?.email || me?.userEmail || null;

        if (fetchedName) {
          localStorage.setItem("name", fetchedName);
          name = fetchedName;
        }
        if (fetchedEmail) {
          localStorage.setItem("email", fetchedEmail);
          email = fetchedEmail;
        }
        if (name && email) return { userId, name, email };
      } catch (e) {
        console.warn("Profile fetch failed:", e?.response?.data || e.message);
      }
    }

    // Last resort: ask the user once, then store
    const askedName = name || window.prompt("Enter your full name for RSVP:");
    if (!askedName) return { userId, name: null, email: null };
    const askedEmail = email || window.prompt("Enter your email for RSVP:");
    if (!askedEmail) return { userId, name: null, email: null };

    localStorage.setItem("name", askedName.trim());
    localStorage.setItem("email", askedEmail.trim());

    return { userId, name: askedName.trim(), email: askedEmail.trim() };
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/events");
        setEvents(response.data);
        setError("");

        const { userId } = getStoredProfile();
        if (userId) {
          try {
            const rsvpRes = await axios.get(`http://localhost:5000/api/rsvp/${userId}`);
            const statusMap = {};
            rsvpRes.data.forEach((rsvp) => {
              statusMap[rsvp.event_id] = true;
            });
            setRsvpStatus(statusMap);
          } catch (e) {
            console.warn("RSVP status fetch skipped:", e?.response?.data || e.message);
          }
        }
      } catch (err) {
        console.error("Fetch events error:", err.response?.data || err.message);
        setError("Could not load events at the moment.");
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const handleRSVP = async (event) => {
    const { userId } = getStoredProfile();

    if (!userId) {
      alert("You must be logged in to RSVP!");
      navigate("/login");
      return;
    }

    // Ensure we have name/email before proceeding
    const profile = await ensureProfile();
    if (!profile.name || !profile.email) {
      alert("Your profile is missing name or email. Please sign out and log in again so your details are saved.");
      return;
    }

    try {
      if (!rsvpStatus[event.id]) {
        const confirmRSVP = window.confirm(`Do you want to RSVP for "${event.title}"?`);
        if (!confirmRSVP) return;

        await axios.post(`http://localhost:5000/api/events/${event.id}/rsvp`, {
          userId: profile.userId,
          name: profile.name,
          email: profile.email,
        });

        setRsvpStatus((prev) => ({ ...prev, [event.id]: true }));
        alert(`RSVP confirmed for "${event.title}"!`);
      } else {
        const confirmCancel = window.confirm(`Do you want to cancel your RSVP for "${event.title}"?`);
        if (!confirmCancel) return;

        await axios.post(`http://localhost:5000/api/events/${event.id}/rsvp/cancel`, {
          userId: profile.userId,
        });

        setRsvpStatus((prev) => ({ ...prev, [event.id]: false }));
        alert(`RSVP cancelled for "${event.title}".`);
      }
    } catch (err) {
      console.error("RSVP error:", err.response?.data || err.message);
      alert(err.response?.data?.error || "RSVP action failed!");
    }
  };

  return (
    <div style={{ backgroundColor: "#008080", minHeight: "100vh", paddingTop: "60px", paddingBottom: "40px" }}>
      <div style={{
        maxWidth: "1100px",
        margin: "auto",
        backgroundColor: "#fff",
        padding: "40px",
        borderRadius: "14px",
        boxShadow: "0 0 20px rgba(0,0,0,0.3)",
      }}>
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <h1 style={{ fontSize: "2.5rem", color: "#0077cc", marginBottom: "10px" }}>🌟 Upcoming Events</h1>
          <p style={{ fontSize: "1.1rem", color: "#333" }}>
            Discover, connect, and make an impact in your community.
          </p>
        </div>

        {loading && <p style={{ textAlign: "center" }}>Loading events...</p>}
        {error && !loading && events.length === 0 && (
          <p style={{ textAlign: "center", color: "red" }}>{error}</p>
        )}
        {!loading && events.length === 0 && !error && (
          <p style={{ textAlign: "center" }}>No events available at the moment.</p>
        )}

        <div style={{ display: "flex", flexWrap: "wrap", gap: "30px", justifyContent: "center" }}>
          {events.map((event) => (
            <div key={event.id} style={{
              flex: "1 1 300px",
              backgroundColor: "#fefefe",
              padding: "20px",
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              transition: "transform 0.3s ease",
            }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}>
              {event.image && (
                <img src={event.image} alt={event.title}
                  style={{ width: "100%", borderRadius: "8px", marginBottom: "12px" }} />
              )}
              <h2 style={{ color: "#0077cc", marginBottom: "10px" }}>{event.title}</h2>
              <p style={{ marginBottom: "8px", fontWeight: "500" }}>
                📅 {new Date(event.date).toLocaleDateString()} — 📍 {event.location}
              </p>
              {event.description && <p style={{ marginBottom: "12px", color: "#555" }}>{event.description}</p>}

              <button
                onClick={() => handleRSVP(event)}
                style={{
                  width: "100%",
                  padding: "10px",
                  backgroundColor: rsvpStatus[event.id] ? "red" : "green",
                  color: "#fff",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                {rsvpStatus[event.id] ? "❌ Cancel RSVP" : "RSVP"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Events;