import { useState } from "react";
import axios from "axios";

function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();

    // Validate fields
    if (!name.trim() || !email.trim() || !message.trim()) {
      alert("All fields must be filled.");
      return;
    }

    // Email format check
  
   const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      alert("Email must be in the format user@xyz.com");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/contact", {
        name,
        email,
        message,
      });

      alert(response.data.message || "Message sent! We’ll get back to you soon.");
      setName("");
      setEmail("");
      setMessage("");
    } catch (error) {
      console.error("Contact error:", error.response?.data || error.message);
      alert(error.response?.data?.error || "Failed to send message");
    }
  };

  return (
    <div style={{ backgroundColor: "#008080", minHeight: "100vh", paddingTop: "60px", paddingBottom: "40px" }}>
      <div
        style={{
          maxWidth: "700px",
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
          Contact Us
        </h1>
        <p style={{ textAlign: "center", color: "#333", marginBottom: "30px" }}>
          Have questions or suggestions? We'd love to hear from you.
        </p>

        <div style={{ textAlign: "center", marginBottom: "30px" }}>
          <h2 style={{ color: "green", marginBottom: "10px" }}>Reach Out</h2>
          <p>You can contact us directly through email or phone.</p>
          <ul style={{ listStyle: "none", padding: 0 }}>
            <li>📍 Rawalpindi, Pakistan</li>
            <li>📞 +92 314-1111111</li>
            <li>📧 info@eventpulse.com</li>
            <li>📧 milesfootwear.com</li>
          </ul>
        </div>

        <div style={{ textAlign: "center", marginBottom: "30px" }}>
          <h3 style={{ marginBottom: "10px" }}>Follow Me</h3>
          <a href="https://www.instagram.com/" style={{ marginRight: "15px", color: "purple" }}>
            Instagram
          </a>
          <a href="https://www.facebook.com/" style={{ color: "purple" }}>
            Facebook
          </a>
        </div>

        <div>
          <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Send a Message</h2>
          <form onSubmit={submitHandler}>
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{
                width: "100%",
                padding: "12px",
                marginBottom: "12px",
                border: "1px solid #ccc",
                borderRadius: "6px",
              }}
            />

            <input
              type="email"
              placeholder="Your Email (e.g. user@xyz.com)"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: "100%",
                padding: "12px",
                marginBottom: "12px",
                border: "1px solid #ccc",
                borderRadius: "6px",
              }}
            />

            <textarea
              rows="5"
              placeholder="Your Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              style={{
                width: "100%",
                padding: "12px",
                marginBottom: "20px",
                border: "1px solid #ccc",
                borderRadius: "6px",
                resize: "none",
              }}
            ></textarea>

            <button
              type="submit"
              style={{
                width: "100%",
                padding: "12px",
                backgroundColor: "green",
                color: "#fff",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contact;