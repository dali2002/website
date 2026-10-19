// The Cuts demo website interactions.
// IMPORTANT: Replace the demo details in index.html and set BUSINESS_EMAIL below before launch.
const BUSINESS_EMAIL = "hello@example.com";

const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");

if (menuToggle && mainNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
  });

  mainNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

const year = document.querySelector("#year");
if (year) year.textContent = new Date().getFullYear();


// Inside script.js (update the bookingForm submit section)
// Inside script.js (update the bookingForm submit section)
const bookingForm = document.querySelector("#booking-form");
const formStatus = document.querySelector("#form-status");

if (bookingForm) {
  bookingForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!bookingForm.reportValidity()) return;

    const formData = new FormData(bookingForm);
    const data = {
      name: String(formData.get("name") || "").trim(),
      phone: String(formData.get("phone") || "").trim(),
      service: String(formData.get("service") || "").trim(),
      message: String(formData.get("message") || "").trim()
    };

    formStatus.textContent = "Sending your appointment request...";
    formStatus.className = "form-hint";

    try {
      const response = await fetch('/api/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      const result = await response.json();

      if (result.success) {
        formStatus.textContent = "Appointment booked successfully! We'll contact you soon.";
        formStatus.style.color = "var(--gold)";
        bookingForm.reset();
      } else {
        throw new Error(result.error || 'Something went wrong');
      }
    } catch (err) {
      formStatus.textContent = "Failed to submit appointment. Please try calling us directly.";
      formStatus.style.color = "#bd4b3c";
    }
  });
}
