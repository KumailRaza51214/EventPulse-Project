import { useNavigate } from "react-router-dom";

function About() {
  const navigate = useNavigate();

  return (
    <div style={{ backgroundColor: "#008080", minHeight: "100vh", paddingTop: "60px", paddingBottom: "40px" }}>
      <div
        style={{
          maxWidth: "800px",
          margin: "auto",
          backgroundColor: "#fff",
          padding: "40px",
          borderRadius: "12px",
          boxShadow: "0 0 15px rgba(0,0,0,0.3)",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            color: "#f0ff4e",
            fontSize: "2.2rem",
            marginBottom: "10px",
            textShadow: "1px 1px 2px rgba(0,0,0,0.4)",
          }}
        >
          About EventPulse Community Manager
        </h1>
        <p style={{ textAlign: "center", color: "#333", marginBottom: "30px" }}>
          Your gateway to discovering and participating in community events.
        </p>

        <div style={{ marginBottom: "30px" }}>
          <h2 style={{ color: "green", marginBottom: "10px" }}>🌟 Our Purpose</h2>
          <p>
            EventPulse connects people with meaningful community activities such as social gatherings,
            charity events, workshops, festivals, and more. We believe in building bridges through shared experiences.
          </p>
        </div>

        <div style={{ marginBottom: "30px" }}>
          <h2 style={{ color: "green", marginBottom: "10px" }}>💡 Why We Do It?</h2>
          <ul style={{ paddingLeft: "20px", lineHeight: "1.8" }}>
            <li>✅ Encourage community involvement</li>
            <li>✅ Make event participation easy</li>
            <li>✅ Support volunteer culture</li>
            <li>✅ Connect people with shared interests</li>
          </ul>
        </div>

        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <button
            onClick={() => navigate("/signup")}
            style={{
              padding: "12px 24px",
              backgroundColor: "green",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: "bold",
              fontSize: "1rem",
            }}
          >
            Join the Community
          </button>
        </div>

        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <h3 style={{ marginBottom: "10px" }}>💬 What People Say</h3>
          <p style={{ fontStyle: "italic", color: "#666" }}>
            “EventPulse helped me find local causes I care about.” — Community Volunteer
          </p>
          <p style={{ fontStyle: "italic", color: "#666" }}>
            “I met amazing people through their workshops.” — Youth Organizer
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;