function Volunteer() {
  const submitHandler = () => {
    alert("Volunteer form submitted successfully!");
  };

  return (
    <>
      {/* PAGE HEADER */}
      <section className="page-header">
        <h1>Become a Volunteer</h1>
        <p>Help make events successful by joining our volunteer team.</p>
      </section>

      {/* VOLUNTEER FORM */}
      <section className="volunteer-form-section">
        <form
          onSubmit={submitHandler}
          style={{
            maxWidth: "400px",
            margin: "auto",
            textAlign: "center"
          }}
        >
          {/* NAME */}
          <div style={{ marginBottom: "12px", textAlign: "left" }}>
            <label>Name</label>
            <input
              type="text"
              required
              style={{
                width: "100%",
                padding: "12px",
                marginTop: "6px",
                border: "1px solid #ccc",
                borderRadius: "6px"
              }}
            />
          </div>

          {/* EMAIL */}
          <div style={{ marginBottom: "12px", textAlign: "left" }}>
            <label>Email</label>
            <input
              type="email"
              required
              style={{
                width: "100%",
                padding: "12px",
                marginTop: "6px",
                border: "1px solid #ccc",
                borderRadius: "6px"
              }}
            />
          </div>

          {/* AREA OF INTEREST */}
          <div style={{ marginBottom: "18px", textAlign: "left" }}>
            <label>Area of Interest</label>
            <textarea
              rows="5"
              required
              style={{
                width: "100%",
                padding: "12px",
                marginTop: "6px",
                border: "1px solid #ccc",
                borderRadius: "6px",
                resize: "none"
              }}
            ></textarea>
          </div>
          
          <button className="btn" type="submit">
            Submit
          </button>
        </form>
      </section>
    </>
  );
}

export default Volunteer;
  