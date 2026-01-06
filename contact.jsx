function Contact() {
  const submitHandler = () => {
    alert("Message sent! We’ll get back to you soon.");
  };

  return (
    <>
      <section>
        <h1>Contact Us</h1>
        <p>Have questions or suggestions? We'd love to hear from you.</p>
      </section>

      <section>
        <div>
          <h2>Reach Out</h2>
          <p>You can contact us directly through email or phone.</p>

          <ul>
            <li>📍 Rawalpindi, Pakistan</li>
            <li>📞 +92 314-1111111</li>
            <li>📧 info@eventpulse.com</li>
          </ul>

          <h3>Follow Me</h3>
          <div className="social-links">
            <a href="https://www.instagram.com/">Instagram</a>
            <a href="https://www.facebook.com/">Facebook</a>
          </div>

          <div className="contact-form-box">
            <h2 style={{ textAlign: "center" }}>Send a Message</h2>

            <form
              className="contact-form"
              onSubmit={submitHandler}
              style={{ maxWidth: "400px", margin: "auto", textAlign: "center" }}
            >
              <input
                type="text"
                placeholder="Your Name"
                required
                style={{
                  width: "100%",
                  padding: "12px",
                  marginBottom: "8px",
                  border: "1px solid #ccc",
                  borderRadius: "6px"
                }}
              />
  
              <input
                type="email"
                placeholder="Your Email"
                required
                style={{
                  width: "100%",
                  padding: "12px",
                  marginBottom: "8px",
                  border: "1px solid #ccc",
                  borderRadius: "6px"
                }}
              />

              <textarea
                rows="5"
                placeholder="Your Message"
                required
                style={{
                  width: "100%",
                  padding: "12px",
                  marginBottom: "8px",
                  border: "1px solid #ccc",
                  borderRadius: "6px",
                  resize: "none"
                }}
              ></textarea>

              <button type="submit" className="btn">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

export default Contact;
