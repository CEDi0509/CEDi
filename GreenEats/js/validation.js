// validation.js — Validate Contact Us form before redirecting

document.addEventListener("DOMContentLoaded", function () {
  const contactForm = document.getElementById("contactForm");
  if (!contactForm) return;

  contactForm.addEventListener("submit", function (e) {
    e.preventDefault(); // prevent default submission

    // Clear previous error messages
    document.querySelectorAll(".error").forEach((el) => (el.textContent = ""));

    const nameField = document.getElementById("name");
    const emailField = document.getElementById("email");
    const messageField = document.getElementById("message");

    let valid = true;

    // Name validation: required, at least 2 characters
    if (nameField.value.trim().length < 2) {
      showError(nameField, "Please enter your name (at least 2 characters).");
      valid = false;
    }

    // Email validation: simple regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailField.value.trim())) {
      showError(emailField, "Please enter a valid email address.");
      valid = false;
    }

    // Message validation: required, at least 10 chars
    if (messageField.value.trim().length < 10) {
      showError(messageField, "Message must be at least 10 characters long.");
      valid = false;
    }

    if (valid) {
      // If all fields are valid, redirect to thankyou.html
      window.location.href = "thankyou.html";
    }
  });

  function showError(inputEl, message) {
    const errorEl = inputEl.parentElement.querySelector(".error");
    if (errorEl) errorEl.textContent = message;
  }
});
