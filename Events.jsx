import { useState } from "react";

function Events() {
  const [rsvpStatus, setRsvpStatus] = useState({});

  const events = [
      {
        title: "University Cafeteria Clean-Up",
        date: "Feb 25, 2026",
        location: "FFC Cafeteria",
        image:
          "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70"
      },
      {
        title: "Food Donation Drive",
        date: "Jan 10, 2026",
        location: "Adyala Road",
        image:
          "https://images.unsplash.com/photo-1519681393784-d120267933ba"
      },
      
  ];

  const handleRSVP = (title) => {
    if (window.confirm(`Do you want to RSVP for "${title}"?`)) {
      setRsvpStatus({ ...rsvpStatus, [title]: true });
      alert("RSVP confirmed!");
    }
  };

  return (
    <>
      <section className="page-header">
        <h1>Upcoming Events</h1>
        <p>Find community events and participate with ease.</p>
      </section>

      <section className="events-list">
        {events.map((event) => (
          <div className="event-card" key={event.title}>
            <img src={event.image} alt={event.title} />
            <h3>{event.title}</h3>    
            <p>
              📅 {event.date} — 📍 {event.location}
            </p>

            <button
              className="btn"
              onClick={() => handleRSVP(event.title)}
              disabled={rsvpStatus[event.title]} /*lock the button after click*/
            >
              {rsvpStatus[event.title] ? "RSVP’d" : "RSVP"}
            </button>
          </div>
        ))}
      </section>
    </>
  );
}

export default Events;
