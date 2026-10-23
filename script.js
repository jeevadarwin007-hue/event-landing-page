/* =====================================================================
   CYBERPULSE '26 - INTERACTIVE SCRIPT
   Topics Demonstrated:
   1. Variables & Selectors (const, let)
   2. DOM Manipulation & Event Listeners
   3. Modal Dialog Interaction (Register Button)
   4. Form Validation with Regex & Error Handlers
   5. Alert Button Interaction
   6. Live Dynamic Countdown Timer
   ===================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  // -------------------------------------------------------------
  // FEATURE 1: ALERT BUTTON INTERACTION
  // -------------------------------------------------------------
  const alertBtn = document.getElementById("alert-btn");

  if (alertBtn) {
    alertBtn.addEventListener("click", () => {
      alert(
        "⚡ CYBERPULSE 2026 - EVENT GUIDELINES:\n\n" +
        "1. Reporting Time: 08:30 AM at APJ Abdul Kalam Auditorium.\n" +
        "2. College ID cards are mandatory for campus entry.\n" +
        "3. Bringing personal laptops is required for CodeSprint and CTF tracks.\n" +
        "4. High-speed Wi-Fi and power strips will be provided in Hall B.\n" +
        "5. Certificates of participation will be issued to all attendees."
      );
    });
  }

  // -------------------------------------------------------------
  // FEATURE 2: MODAL INTERACTION (REGISTRATION BUTTON)
  // -------------------------------------------------------------
  const openModalBtns = document.querySelectorAll(".open-modal-btn");
  const modalOverlay = document.getElementById("registration-modal");
  const closeModalBtn = document.getElementById("close-modal");
  const successDismissBtn = document.getElementById("success-dismiss");
  const regForm = document.getElementById("event-reg-form");
  const successBox = document.getElementById("reg-success");

  // Function to open registration popup modal
  const openModal = () => {
    modalOverlay.classList.add("active");
  };

  // Function to close modal and reset fields
  const closeModal = () => {
    modalOverlay.classList.remove("active");
    // Reset confirmation state if re-opened
    setTimeout(() => {
      regForm.style.display = "block";
      successBox.classList.remove("active");
      clearErrors();
    }, 300);
  };

  // Bind click listeners to all registration buttons
  openModalBtns.forEach((btn) => {
    btn.addEventListener("click", openModal);
  });

  closeModalBtn.addEventListener("click", closeModal);
  successDismissBtn.addEventListener("click", closeModal);

  // Close modal when clicking backdrop outside card
  modalOverlay.addEventListener("click", (e) => {
    if (e.target === modalOverlay) {
      closeModal();
    }
  });

  // -------------------------------------------------------------
  // FEATURE 3: FORM VALIDATION
  // -------------------------------------------------------------
  const nameInput = document.getElementById("fullname");
  const emailInput = document.getElementById("email");
  const phoneInput = document.getElementById("phone");
  const trackSelect = document.getElementById("track");

  const nameError = document.getElementById("name-error");
  const emailError = document.getElementById("email-error");
  const phoneError = document.getElementById("phone-error");
  const trackError = document.getElementById("track-error");

  // Helper function to reset validation errors
  const clearErrors = () => {
    [nameInput, emailInput, phoneInput, trackSelect].forEach((input) => {
      input.classList.remove("invalid");
    });
    [nameError, emailError, phoneError, trackError].forEach((err) => {
      err.classList.remove("visible");
    });
  };

  // Real-time error removal when user starts typing
  [nameInput, emailInput, phoneInput, trackSelect].forEach((input) => {
    input.addEventListener("input", () => {
      input.classList.remove("invalid");
      const errSpan = document.getElementById(`${input.id}-error`);
      if (errSpan) errSpan.classList.remove("visible");
    });
  });

  // Handle Form Submission
  regForm.addEventListener("submit", (e) => {
    e.preventDefault(); // Stop standard page reload
    clearErrors();

    let isValid = true;

    // 1. Validate Name (at least 3 non-whitespace characters)
    const nameVal = nameInput.value.trim();
    if (nameVal.length < 3) {
      nameInput.classList.add("invalid");
      nameError.classList.add("visible");
      isValid = false;
    }

    // 2. Validate Email using regular expression
    const emailVal = emailInput.value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(emailVal)) {
      emailInput.classList.add("invalid");
      emailError.classList.add("visible");
      isValid = false;
    }

    // 3. Validate 10-digit Indian mobile number
    const phoneVal = phoneInput.value.trim();
    const phonePattern = /^[6-9]\d{9}$/;
    if (!phonePattern.test(phoneVal)) {
      phoneInput.classList.add("invalid");
      phoneError.classList.add("visible");
      isValid = false;
    }

    // 4. Validate Event Track Selection
    const trackVal = trackSelect.value;
    if (!trackVal) {
      trackSelect.classList.add("invalid");
      trackError.classList.add("visible");
      isValid = false;
    }

    // If all inputs pass validation
    if (isValid) {
      // Hide form and display personalized success screen
      regForm.style.display = "none";
      const successText = document.getElementById("success-text");
      successText.innerHTML = `Welcome, <strong>${nameVal}</strong>! You have been successfully registered for <strong>${trackVal}</strong>. A confirmation email has been dispatched to <em>${emailVal}</em>.`;
      successBox.classList.add("active");

      // Reset form fields
      regForm.reset();
    }
  });

  // -------------------------------------------------------------
  // FEATURE 4 (BONUS): LIVE COUNTDOWN TIMER
  // -------------------------------------------------------------
  const eventDate = new Date("November 14, 2026 09:00:00").getTime();

  const updateCountdown = () => {
    const now = new Date().getTime();
    const distance = eventDate - now;

    if (distance > 0) {
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      document.getElementById("days").textContent = String(days).padStart(2, "0");
      document.getElementById("hours").textContent = String(hours).padStart(2, "0");
      document.getElementById("minutes").textContent = String(minutes).padStart(2, "0");
      document.getElementById("seconds").textContent = String(seconds).padStart(2, "0");
    } else {
      document.querySelector(".countdown-container").innerHTML = "<p>The Event is Live Now!</p>";
    }
  };

  // Run immediately and update every second
  updateCountdown();
  setInterval(updateCountdown, 1000);
});