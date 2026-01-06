import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Home() {

  const messages = [ /* a plain js array*/
    "Discover Events. Connect. Make an Impact.",
    "Your community awaits — explore events, volunteer.",
    "Be part of something meaningful with EventPulse.",
    "Empower your journey — connect through community and purpose."
  ][messages];

  const [text, setText] = useState(messages[0]);

  useEffect(() => { /*runs js*/
    let index = 0;
    const interval = setInterval(() => {
      setText(messages[index]);
      index = (index + 1) % messages.length;
    }, 1350);

    return () => clearInterval(interval);
  }, );

  return (
    <>
      {/* HERO SECTION */}
      <section className="hero-section">
        <h1 className="hero-text">{text}</h1>
        <p>
          Your community awaits — explore events, volunteer, and become part of
          something meaningful.
        </p>  
        <br />
        <Link to="/events" className="expbutton">
         Explore Events
         </Link>

      </section>

      {/* WHY CHOOSE SECTION (MISSING EARLIER) */}
      <section>
        <h2>Why Choose EventPulse?</h2>

        <div>
          <h3>⭐ Easy Event Discovery</h3>
          <p>Find upcoming events quickly</p>

          <h3>🤝 Volunteer Opportunities</h3>
          <p>Join community projects, charity events, and volunteering drives.</p>

          <h3>📅 Stay Updated</h3>
          <p>Never miss an event with our constantly updated listings.</p>
        </div>
      </section>
    </>
  );
}

export default Home;
  
