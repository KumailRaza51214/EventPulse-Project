// ======= INTERACTIVE NAVIGATION =======
// Highlights active link and adds smooth scroll effect for internal anchors
(function navModule() {
  const path = location.pathname.split("/").pop();
  document.querySelectorAll("header nav a").forEach(a => {
    if (a.getAttribute("href") === path) a.classList.add("active");

    // Smooth scroll for anchor links
    if (a.getAttribute("href")?.startsWith("#")) {
      a.addEventListener("click", e => {
        e.preventDefault();
        const target = document.querySelector(a.getAttribute("href"));
        if (target) target.scrollIntoView({ behavior: "smooth" });
      });
    }
  });
})();

// ======= CONTACT FORM (simple feedback only) =======
(function contactFormModule() {
  const form = document.querySelector(".contact-form");
  if (!form) return;

  form.addEventListener("submit", e => {
    e.preventDefault();
    alert("Message sent! We’ll get back to you soon.");
    form.reset();
  });
})();

// ======= VOLUNTEER FORM (simple feedback only) =======
(function volunteerFormModule() {
  const form = document.querySelector(".volunteer-form");
  if (!form) return;

  form.addEventListener("submit", e => {
    e.preventDefault();
    alert("Thank you for volunteering! We’ll contact you soon.");
    form.reset();
  });
})();

// ======= EVENTS PAGE: RSVP + IMAGE SLIDER =======
(function eventsModule() {
  const eventsSection = document.querySelector(".events-list");
  if (!eventsSection) return;

  eventsSection.addEventListener("click", e => {
    const btn = e.target.closest(".btn");
    if (!btn) return;
    const card = btn.closest(".event-card");
    const title = card.querySelector("h3").textContent;

    // RSVP confirmation
    const attending = confirm(`Do you want to RSVP for "${title}"?`);
    if (attending) {
      card.classList.add("rsvp-confirmed");
      btn.textContent = "RSVP’d";
      btn.disabled = true;
      alert("RSVP confirmed! Enjoy the event.");

      // Dynamic content display: image slider inside the card
      const images = card.querySelectorAll("img");
      if (images.length > 1) {
        let index = 0;
        setInterval(() => {
          images.forEach((img, i) => {
            img.style.display = i === index ? "block" : "none";
          });
          index = (index + 1) % images.length;
        }, 3000);
      }
    }
  });
})();

// ======= HOMEPAGE: Dynamic Hero Content =======
(function homepageModule() {
  const hero = document.querySelector(".hero-content h1");
  if (!hero) return;

  const messages = [
    "Discover Events. Connect. Make an Impact.",
    "Your community awaits — explore and volunteer.",
    "Be part of something meaningful with EventPulse.",
    "Empower your journey — connect through community and purpose.",
    "Turn moments into movements with EventPulse — where action meets impact."

  ];

  let index = 0;
  setInterval(() => {
    hero.textContent = messages[index];
    index = (index + 1) % messages.length;
  }, 4000);
})();