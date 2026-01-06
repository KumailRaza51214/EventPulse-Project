import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.password || !form.confirm) {
      setError("All fields are required.");
      return;
    }
    if (form.password !== form.confirm) {
      setError("Passwords do not match.");
      return;
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(form.email)) {
      setError("Please enter a valid email address.");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post("http://localhost:5000/api/auth/signup", {
        name: form.name,
        email: form.email,
        password: form.password,
      });

      setSuccess(response.data.message || "Account created successfully!");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      console.error("Signup error:", err.response?.data || err.message);
      setError(err.response?.data?.error || "Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={pageStyle}>
      <div style={cardStyle}>
        <h1 style={titleStyle}>Create an Account</h1>

        {error && <p style={errorStyle}>{error}</p>}
        {success && <p style={successStyle}>{success}</p>}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            style={inputStyle}
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            style={inputStyle}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            style={inputStyle}
          />
          <input
            type="password"
            name="confirm"
            placeholder="Confirm Password"
            value={form.confirm}
            onChange={handleChange}
            style={inputStyle}
          />

          <button type="submit" style={buttonStyle} disabled={loading}>
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>

        <p style={{ textAlign: "center", marginTop: "20px" }}>
          Already have an account?{" "}
          <a href="/login" style={linkStyle}>
            Login here
          </a>
        </p>
      </div>
    </div>
  );
}

// 🎨 Styles
const pageStyle = {
  backgroundColor: "#008080",
  minHeight: "100vh",
  paddingTop: "60px",
  paddingBottom: "40px",
};

const cardStyle = {
  maxWidth: "500px",
  margin: "auto",
  backgroundColor: "#fff",
  padding: "40px",
  borderRadius: "12px",
  boxShadow: "0 0 15px rgba(0,0,0,0.3)",
};

const titleStyle = {
  textAlign: "center",
  color: "#f0ff4e",
  fontSize: "2.2rem",
  marginBottom: "10px",
  textShadow: "1px 1px 2px rgba(0,0,0,0.4)",
};

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginBottom: "12px",
  border: "1px solid #ccc",
  borderRadius: "6px",
};

const buttonStyle = {
  width: "100%",
  padding: "12px",
  backgroundColor: "green",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  fontWeight: "bold",
  marginTop: "10px",
};

const linkStyle = {
  color: "#0077cc",
  textDecoration: "underline",
  fontWeight: "bold",
};

const errorStyle = {
  color: "red",
  textAlign: "center",
  marginBottom: "10px",
};

const successStyle = {
  color: "green",
  textAlign: "center",
  marginBottom: "10px",
};

export default Signup;