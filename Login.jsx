import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/events"); 
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      alert("Email and password fields cannot be empty.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", {
        email: email.toLowerCase().trim(),
        password,
      });

      if (!response.data || !response.data.user) {
        alert("No user registered with this email. Please sign up first.");
        navigate("/signup");
        return;
      }

      const { user, token } = response.data;

      localStorage.setItem("userId", user.id);
      localStorage.setItem("userName", user.name); 
      localStorage.setItem("email", user.email);
      localStorage.setItem("token", token);

      alert(`Login successful! Welcome, ${user.name}`);
      navigate("/events");
    } catch (err) {
      console.error("Login error:", err.response?.data || err.message);
      alert(err.response?.data?.error || "Login failed!");
    }
  };

  return (
    <div
      className="login-page"
      style={{ backgroundColor: "#008080", minHeight: "100vh", paddingTop: "60px" }}
    >
      <form
        className="login-form"
        onSubmit={handleLogin}
        style={{
          maxWidth: "400px",
          margin: "auto",
          backgroundColor: "#fff",
          padding: "30px",
          borderRadius: "10px",
          boxShadow: "0 0 10px rgba(0,0,0,0.2)",
          textAlign: "center",
        }}
      >
        <h2 style={{ color: "green", marginBottom: "10px" }}>Welcome Back</h2>
        <p style={{ marginBottom: "20px" }}>Login to manage your events</p>

        <input
          type="email"
          placeholder="Email"
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

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "20px",
            border: "1px solid #ccc",
            borderRadius: "6px",
          }}
        />

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
          Login
        </button>

        <p style={{ marginTop: "20px" }}>
          Don’t have an account?{" "}
          <a href="/signup" style={{ color: "purple", textDecoration: "underline" }}>
            Register here
          </a>
        </p>
      </form>
    </div>
  );
}

export default Login;