function validateLoginForm() {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (email === "" || password === "") {
    alert("Please fill in both fields.");
    return false;
  }
  if (!email.includes("@")) {
    alert("Please enter a valid email address.");
    return false;
  }
  alert("Login successful!");
  return true;
}

function validateSignupForm() {
  const name = document.getElementById("fullname").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const confirmPassword = document.getElementById("confirmPassword").value.trim();

  if (name === "" || email === "" || password === "" || confirmPassword === "") {
    alert("Please fill in all fields.");
    return false;
  }

  if (!email.includes("@")) {
    alert("Please enter a valid email address.");
    return false;
  }

  if (password.length < 6) {
    alert("Password must be at least 6 characters long.");
    return false;
  }

  if (password !== confirmPassword) {
    alert("Passwords do not match!");
    return false;
  }

  alert("Signup successful!");
  return true;
}

(function contactFormModule() {
  const form = document.querySelector(".contact-form");
  if (!form) return;

  form.addEventListener("submit", e => {
    e.preventDefault();
    alert("Message sent! We’ll get back to you soon.");
    form.reset();
  });
})();

(function volunteerFormModule() {
  const form = document.querySelector(".volunteer-form");
  if (!form) return;

  form.addEventListener("submit", e => {
    e.preventDefault();
    alert("Thank you for volunteering! We’ll contact you soon.");
    form.reset();
  });
})();

(function eventsModule() {
  const eventsSection = document.querySelector(".events-list");
  if (!eventsSection) return;

  eventsSection.addEventListener("click", e => {
    const btn = e.target.closest(".btn");
    if (!btn) return;

    const card = btn.closest(".event-card");
    const title = card.querySelector("h3").textContent;

    const attending = confirm(`Do you want to RSVP for "${title}"?`);
    if (attending) {
      card.classList.add("rsvp-confirmed");
      btn.textContent = "RSVP’d";
      btn.disabled = true;
      alert("RSVP confirmed! Enjoy the event.");
    }
  });
})();

const hero = document.querySelector(".hero-text");

const messages = [
  "Discover Events. Connect. Make an Impact.",
  "Your community awaits — explore and volunteer.",
  "Be part of something meaningful with EventPulse.",
  "Empower your journey — connect through community and purpose."
];

let index = 0;

setInterval(() => {
  hero.textContent = messages[index];
  index = (index + 1) % messages.length;
}, 1350);
