(() => {
  "use strict";

  document.querySelectorAll(".password-toggle").forEach((button) => {
    button.addEventListener("click", () => {
      const input = button.parentElement.querySelector("input");
      const isVisible = input.type === "text";
      input.type = isVisible ? "password" : "text";
      button.setAttribute("aria-pressed", String(!isVisible));
      button.setAttribute("aria-label", isVisible ? "Tampilkan kata sandi" : "Sembunyikan kata sandi");
      button.innerHTML = `<i class="bi ${isVisible ? "bi-eye" : "bi-eye-slash"}"></i>`;
    });
  });

  document.querySelectorAll("[data-demo-message]").forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const feedback = document.querySelector(".form-feedback");
      feedback.className = "form-feedback is-info";
      feedback.textContent = link.dataset.demoMessage;
    });
  });

  document.querySelectorAll("[data-auth-form]").forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const feedback = form.querySelector(".form-feedback");
      feedback.className = "form-feedback";
      feedback.textContent = "";

      if (!form.checkValidity()) {
        form.reportValidity();
        feedback.classList.add("is-error");
        feedback.textContent = "Periksa kembali informasi yang wajib diisi.";
        return;
      }

      if (form.dataset.authForm === "register") {
        const password = form.elements.password.value;
        const confirmation = form.elements["confirm-password"].value;
        if (password !== confirmation) {
          form.elements["confirm-password"].setCustomValidity("Kata sandi belum sama.");
          form.elements["confirm-password"].reportValidity();
          form.elements["confirm-password"].setCustomValidity("");
          feedback.classList.add("is-error");
          feedback.textContent = "Kata sandi dan konfirmasi belum sama.";
          return;
        }
      }

      feedback.classList.add("is-info");
      feedback.textContent = form.dataset.authForm === "login"
        ? "Form demo tervalidasi. Login belum terhubung dan tidak ada data yang dikirim."
        : "Form demo tervalidasi. Pendaftaran belum terhubung dan tidak ada data yang disimpan.";
    });
  });
})();
