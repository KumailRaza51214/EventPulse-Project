import { useEffect, useState } from "react";

function Home() {
  const messages = [
    "Discover Events. Connect. Make an Impact.",
    "Your community awaits — explore events, volunteer.",
    "Be part of something meaningful with EventPulse.",
    "Empower your journey — connect through community and purpose.",
  ];

  const [text, setText] = useState(messages[0]);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setText(messages[index]);
      index = (index + 1) % messages.length;
    }, 1350);

    return () => clearInterval(interval);
  }, );

  return (
    <div style={{ backgroundColor: "#008080", minHeight: "100vh", paddingTop: "60px", paddingBottom: "40px" }}>
      {/* HERO SECTION */}
      <section
        style={{
          maxWidth: "800px",
          margin: "auto",
          backgroundColor: "#fff",
          padding: "40px",
          borderRadius: "12px",
          boxShadow: "0 0 15px rgba(0,0,0,0.3)",
          textAlign: "center",
        }}
      >
        <h1
          style={{
            color: "#0077cc",
            fontSize: "2.2rem",
            marginBottom: "10px",
            fontWeight: "bold",
          }}
        >
          {text}
        </h1>
        <p style={{ color: "#333", marginBottom: "20px" }}>
          Your community awaits — explore events, volunteer, and become part of something meaningful.
        </p>
        <a
          href="/events"
          style={{
            padding: "12px 24px",
            backgroundColor: "green",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "bold",
            textDecoration: "none",
            fontSize: "1rem",
          }}
        >
          Explore Events
        </a>
      </section>

      <section
        style={{
          maxWidth: "800px",
          margin: "40px auto 0",
          backgroundColor: "#fff",
          padding: "30px",
          borderRadius: "12px",
          boxShadow: "0 0 15px rgba(0,0,0,0.2)",
        }}
      >
        <h2 style={{ textAlign: "center", color: "green", marginBottom: "30px" }}>
          Why Choose EventPulse?
        </h2>

        <div style={{ lineHeight: "1.8", fontSize: "1rem", color: "#333" }}>
          <h3>⭐ Easy Event Discovery</h3>
          <p>Find upcoming events quickly and effortlessly.</p>

          <h3>🤝 Volunteer Opportunities</h3>
          <p>Join community projects, charity events, and volunteering drives.</p>

          <h3>📅 Stay Updated</h3>
          <p>Never miss an event with our constantly updated listings.</p>
        </div>
      </section>
    </div>
  );
}

export default Home;