(function () {
  "use strict";

  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".main-nav");

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      const isOpen = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });
  }

  // FAQ accordion behavior
  const faqQuestions = document.querySelectorAll(".faq-question");
  faqQuestions.forEach(function (question) {
    question.addEventListener("click", function () {
      const expanded = question.getAttribute("aria-expanded") === "true";
      question.setAttribute("aria-expanded", String(!expanded));

      const answer = question.nextElementSibling;
      if (!answer) return;

      if (expanded) {
        answer.style.maxHeight = "0px";
      } else {
        answer.style.maxHeight = answer.scrollHeight + "px";
      }
    });
  });

  // Contact form validation
  const form = document.getElementById("contactForm");
  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();

      let valid = true;
      const fields = ["name", "email", "instagram", "message"];
      const status = document.getElementById("formStatus");

      fields.forEach(function (id) {
        const input = document.getElementById(id);
        if (!input) return;

        const error = input.parentElement.querySelector(".error-msg");
        const value = input.value.trim();
        let message = "";

        if (!value) {
          message = "This field is required.";
        } else if (id === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          message = "Please enter a valid email address.";
        } else if (id === "instagram" && !/^@?[A-Za-z0-9._]{1,30}$/.test(value)) {
          message = "Enter a valid Instagram username.";
        }

        if (error) error.textContent = message;
        if (message) valid = false;
      });

      if (!status) return;

      if (valid) {
        status.textContent = "Thank you. Your message has been sent successfully.";
        status.style.color = "#166534";
        form.reset();
      } else {
        status.textContent = "Please correct the highlighted fields and try again.";
        status.style.color = "#b91c1c";
      }
    });
  }

  // Subtle scroll reveal
  const revealTargets = document.querySelectorAll(
    ".card, .proof-card, .pricing-card, .step-card, .faq-item, .contact-form, .hero-card"
  );

  if ("IntersectionObserver" in window && revealTargets.length) {
    revealTargets.forEach(function (el) {
      el.classList.add("reveal");
    });

    const observer = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    revealTargets.forEach(function (el) {
      observer.observe(el);
    });
  }
})();
