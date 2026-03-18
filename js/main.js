const menuToggle = document.getElementById("menuToggle");
const siteNav = document.getElementById("siteNav");
const siteHeader = document.querySelector(".site-header");
const yearNode = document.getElementById("year");
const quoteForm = document.getElementById("quoteForm");
const formStatus = document.getElementById("formStatus");

if (yearNode) {
  yearNode.textContent = new Date().getFullYear();
}

if (menuToggle && siteNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  siteNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      siteNav.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

const updateHeaderState = () => {
  if (!siteHeader) {
    return;
  }

  siteHeader.classList.toggle("scrolled", window.scrollY > 8);
};

updateHeaderState();
window.addEventListener("scroll", updateHeaderState, { passive: true });

const clearFormStatus = () => {
  if (!formStatus) {
    return;
  }

  formStatus.hidden = true;
  formStatus.textContent = "";
};

const setFormStatus = (message) => {
  if (!formStatus) {
    return;
  }

  formStatus.hidden = false;
  formStatus.textContent = message;
};

if (quoteForm) {
  quoteForm.querySelectorAll("input, select, textarea").forEach((field) => {
    field.addEventListener("input", clearFormStatus);
    field.addEventListener("change", clearFormStatus);
  });

  quoteForm.addEventListener("submit", (event) => {
    const endpoint = String(quoteForm.dataset.endpoint || "").trim();

    if (!endpoint) {
      event.preventDefault();
      setFormStatus(
        "Quote form is ready, but the submission endpoint has not been connected yet. Please use the email or phone details on this page for now."
      );
      return;
    }

    quoteForm.action = endpoint;
  });
}
