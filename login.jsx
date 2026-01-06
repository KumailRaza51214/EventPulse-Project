import { Link, Router } from "react-router-dom";
function Login() {
    const submitHandler = (e) => {
        e.preventDefault();
        alert("Login submitted ");
    };
  
    return (
      <section className="login-section">
        <div className="login-container">
          <h2>Welcome Back</h2>
          <p>Login to manage your events</p>
  
          <form onSubmit={submitHandler}>
            <input type="email" placeholder="Email" required />
            <input type="password" placeholder="Password" required />
            <button className="btn">Login</button>
  
            <p>
            Don’t have an account? <Link to="/signup">Register here</Link>
            </p>
          </form>
        </div>
      </section>
    );
  }
  
  export default Login;
  

