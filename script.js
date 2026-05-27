(function () {
  var body = document.body;
  var navToggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");
  var form = document.getElementById("waitlist");
  var status = document.getElementById("form-status");
  var revealNodes = document.querySelectorAll("[data-reveal]");

  function setStatus(message, type) {
    if (!status) return;
    status.textContent = message;
    status.classList.remove("is-error", "is-success");
    if (type) {
      status.classList.add(type === "error" ? "is-error" : "is-success");
    }
  }

  if (navToggle && nav) {
    navToggle.addEventListener("click", function () {
      var isOpen = body.classList.toggle("nav-open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    nav.addEventListener("click", function (event) {
      if (event.target instanceof HTMLAnchorElement) {
        body.classList.remove("nav-open");
        navToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  if ("IntersectionObserver" in window && revealNodes.length > 0) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.15 }
    );

    revealNodes.forEach(function (node) {
      observer.observe(node);
    });
  } else {
    revealNodes.forEach(function (node) {
      node.classList.add("is-visible");
    });
  }

  if (!form) return;

  form.addEventListener("submit", function (event) {
    var emailInput = form.querySelector('input[name="email"]');
    var endpoint = form.getAttribute("data-form-endpoint") || form.getAttribute("action") || "";
    var submitMode = form.getAttribute("data-submit-mode") || "placeholder";

    if (!(emailInput instanceof HTMLInputElement)) return;

    if (!emailInput.value.trim()) {
      event.preventDefault();
      setStatus("Please enter your email address.", "error");
      emailInput.focus();
      return;
    }

    if (!emailInput.checkValidity()) {
      event.preventDefault();
      setStatus("Please enter a valid email address.", "error");
      emailInput.focus();
      return;
    }

    if (!endpoint) {
      event.preventDefault();
      form.reset();
      setStatus(
        "You're on the list. Connect a provider endpoint when you're ready to collect real submissions.",
        "success"
      );
      return;
    }

    if (submitMode !== "fetch") {
      setStatus("Sending you to the secure signup form...", "success");
      return;
    }

    event.preventDefault();
    setStatus("Submitting your request...", "success");

    fetch(endpoint, {
      method: (form.getAttribute("method") || "POST").toUpperCase(),
      body: new FormData(form),
      headers: {
        Accept: "application/json",
      },
    })
      .then(function (response) {
        if (!response.ok) {
          throw new Error("Submission failed");
        }
        return response.text();
      })
      .then(function () {
        form.reset();
        setStatus("Thanks for joining the waitlist. We'll keep you posted.", "success");
      })
      .catch(function () {
        setStatus(
          "The endpoint rejected the request. Check the provider URL or switch to a native form action.",
          "error"
        );
      });
  });
})();
