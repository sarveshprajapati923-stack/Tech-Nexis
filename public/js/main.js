(function () {
  const toast = document.getElementById("toast");
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(window.__toastTimer);
    window.__toastTimer = setTimeout(() => toast.classList.remove("show"), 2400);
  }

  document.querySelectorAll("[data-toast]").forEach((el) => {
    el.addEventListener("click", () => showToast(el.getAttribute("data-toast")));
  });

  const form = document.querySelector("[data-contact-form]");
  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const formData = new FormData(form);
      const payload = Object.fromEntries(formData.entries());
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        showToast(data.error || "Message could not be sent.");
        return;
      }
      form.reset();
      showToast("Message sent successfully.");
    });
  }
})();
