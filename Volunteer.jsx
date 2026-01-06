import { useState } from "react";
import axios from "axios";

function Volunteer() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [interest, setInterest] = useState("");
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !interest.trim()) {
      alert("All fields must be filled.");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      alert("Email must be in the format user@xyz.com");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post("http://localhost:5000/api/volunteer", {
        name,
        email,
        interest,
      });

      alert(response.data.message || "Thank you for volunteering! A confirmation email has been sent.");
      console.log("Volunteer saved:", response.data);

      setName("");
      setEmail("");
      setInterest("");
    } catch (error) {
      console.error("Volunteer error:", error.response?.data || error.message);
      alert(error.response?.data?.error || "Failed to submit volunteer form.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ backgroundColor: "#008080", minHeight: "100vh", paddingTop: "60px", paddingBottom: "40px" }}>
      <div
        style={{
          maxWidth: "600px",
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
          Become a Volunteer
        </h1>
        <p style={{ textAlign: "center", color: "#333", marginBottom: "30px" }}>
          Help make events successful by joining our volunteer team.
        </p>

        <form onSubmit={submitHandler}>
          <div style={{ marginBottom: "12px", textAlign: "left" }}>
            <label>Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{
                width: "100%",
                padding: "12px",
                marginTop: "6px",
                border: "1px solid #ccc",
                borderRadius: "6px",
              }}
            />
          </div>

          <div style={{ marginBottom: "12px", textAlign: "left" }}>
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: "100%",
                padding: "12px",
                marginTop: "6px",
                border: "1px solid #ccc",
                borderRadius: "6px",
              }}
            />
          </div>

          <div style={{ marginBottom: "18px", textAlign: "left" }}>
            <label>Area of Interest</label>
            <textarea
              rows="5"
              value={interest}
              onChange={(e) => setInterest(e.target.value)}
              style={{
                width: "100%",
                padding: "12px",
                marginTop: "6px",
                border: "1px solid #ccc",
                borderRadius: "6px",
                resize: "none",
              }}
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "12px",
              backgroundColor: loading ? "gray" : "green",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Volunteer;