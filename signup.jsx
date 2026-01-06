function Signup() {
    const submitHandler = () => {
    alert("Signup submitted ");
    };
  
    return (
      <section className="login-section">
        <div className="login-container">
          <h2>Create an Account</h2>
          <p>Join EventPulse!</p>
  
          <form onSubmit={submitHandler}>
            <input type="text" placeholder="Full Name" required />
            <input type="email" placeholder="Email" required />
            <input type="password" placeholder="Password" required />
            <input type="password" placeholder="Confirm Password" required />
  
            <button className="btn">Sign Up</button>
  
            <p>
              Already have an account? <a href="/login">Login here</a>
            </p>
          </form>
        </div>
      </section>
    );
  }
  
  export default Signup;
  
