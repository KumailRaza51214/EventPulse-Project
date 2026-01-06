import { Link, useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  // Check login state
  const isLoggedIn = !!localStorage.getItem("token");
  const userName = localStorage.getItem("userName"); // <-- consistent key

  const handleLogout = () => {
    localStorage.clear();
    alert("Signed out successfully!");
    navigate("/login");
  };

  return (
    <header style={headerStyle}>
      <div style={logoStyle}>Event Pulse Community Manager</div>

      <nav>
        <ul style={navListStyle}>
          <li><Link to="/" style={linkStyle}>Home</Link></li>
          <li><Link to="/events" style={linkStyle}>Events</Link></li>
          <li><Link to="/volunteer" style={linkStyle}>Volunteer</Link></li>
          <li><Link to="/about" style={linkStyle}>About</Link></li>
          <li><Link to="/contact" style={linkStyle}>Contact</Link></li>

          {!isLoggedIn ? (
            <>
              <li><Link to="/login" style={linkStyle}>Login</Link></li>
              <li><Link to="/signup" style={linkStyle}>Signup</Link></li>
            </>
          ) : (
            <>
              <li style={welcomeStyle}>
                {userName ? `Welcome, ${userName}` : "Welcome"}
              </li>
              <li>
                <button onClick={handleLogout} style={logoutButtonStyle}>
                  Sign Out
                </button>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}

// 🎨 Styles
const headerStyle = {
  background: "linear-gradient(90deg, #006666, #00a3a3)",
  padding: "16px 32px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
  position: "sticky",
  top: 0,
  zIndex: 1000,
};

const logoStyle = {
  color: "#f0ff4e",
  fontSize: "1.8rem",
  fontWeight: "bold",
  textShadow: "1px 1px 3px rgba(0,0,0,0.4)",
};

const navListStyle = {
  listStyle: "none",
  display: "flex",
  gap: "20px",
  alignItems: "center",
  margin: 0,
  padding: 0,
};

const linkStyle = {
  color: "#fff",
  textDecoration: "none",
  fontWeight: "600",
  transition: "color 0.3s ease, transform 0.2s ease",
};

const welcomeStyle = {
  color: "#fff",
  fontWeight: "bold",
  marginLeft: "10px",
};

const logoutButtonStyle = {
  backgroundColor: "#ff4e4e",
  color: "#fff",
  border: "none",
  padding: "8px 14px",
  borderRadius: "6px",
  cursor: "pointer",
  fontWeight: "bold",
  transition: "background-color 0.3s ease, transform 0.2s ease",
};

export default Header;