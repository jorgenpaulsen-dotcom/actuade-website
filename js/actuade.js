(() => {
  const body = document.body;
  body.classList.add("motion-ready");

  const menuButton = document.querySelector("[data-menu-toggle]");
  const mobilePanel = document.querySelector("[data-mobile-panel]");

  if (menuButton && mobilePanel) {
    menuButton.addEventListener("click", () => {
      const open = !body.classList.contains("menu-open");
      body.classList.toggle("menu-open", open);
      menuButton.setAttribute("aria-expanded", String(open));
      menuButton.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });

    mobilePanel.addEventListener("click", (event) => {
      if (event.target.closest("a")) {
        body.classList.remove("menu-open");
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.setAttribute("aria-label", "Open menu");
      }
    });
  }

  document.querySelectorAll("[data-year]").forEach((node) => {
    node.textContent = String(new Date().getFullYear());
  });

  const revealItems = document.querySelectorAll(".reveal:not([data-hero-product])");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -12% 0px", threshold: 0.12 });

    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  }

  const counters = document.querySelectorAll("[data-count]");
  if ("IntersectionObserver" in window) {
    const countObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const target = entry.target;
        const finalValue = Number(target.dataset.count);
        const suffix = finalValue === 6000 ? "" : "";
        const duration = 1100;
        const start = performance.now();

        const tick = (now) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          const value = Math.round(finalValue * eased);
          target.textContent = `${value}${suffix}`;
          if (progress < 1) requestAnimationFrame(tick);
        };

        requestAnimationFrame(tick);
        countObserver.unobserve(target);
      });
    }, { threshold: 0.4 });

    counters.forEach((counter) => countObserver.observe(counter));
  }

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const heroProduct = document.querySelector("[data-hero-product]");

  if (heroProduct) {
    const revealHeroProduct = () => heroProduct.classList.add("is-visible");

    if (reduceMotion) {
      revealHeroProduct();
    } else {
      requestAnimationFrame(() => {
        requestAnimationFrame(revealHeroProduct);
      });
      window.setTimeout(() => {
        heroProduct.classList.add("hero-flight-settled");
      }, 1350);
    }
  }

  if (heroProduct && !reduceMotion) {
    const hero = heroProduct.closest(".hero");

    const updateHeroProduct = () => {
      const rect = hero ? hero.getBoundingClientRect() : heroProduct.getBoundingClientRect();
      const range = Math.max(1, rect.height - window.innerHeight * 0.22);
      const progress = Math.min(1, Math.max(0, -rect.top / range));
      const compact = window.matchMedia("(max-width: 820px)").matches;
      const baseY = compact ? 6 : 18;
      const travelY = compact ? 210 : 440;
      const scale = compact ? 1 : Math.max(0.96, 1.08 - progress * 0.12);
      const opacity = Math.max(0, 1 - Math.max(0, progress - 0.38) / 0.45);
      const readoutY = compact ? 0 : progress * -220;

      heroProduct.style.setProperty("--hero-product-y", `${baseY - progress * travelY}px`);
      heroProduct.style.setProperty("--hero-product-scale", String(scale));
      heroProduct.style.setProperty("--hero-product-opacity", String(opacity));
      heroProduct.style.setProperty("--hero-readout-y", `${readoutY}px`);
    };

    updateHeroProduct();
    window.addEventListener("scroll", updateHeroProduct, { passive: true });
    window.addEventListener("resize", updateHeroProduct);
  } else if (heroProduct) {
    heroProduct.style.setProperty("--hero-product-y", "18px");
    heroProduct.style.setProperty("--hero-product-scale", "1.08");
    heroProduct.style.setProperty("--hero-product-opacity", "1");
    heroProduct.style.setProperty("--hero-readout-y", "0px");
  }

  const contactForm = document.querySelector("[data-contact-form]");
  if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const form = new FormData(contactForm);
      const name = String(form.get("name") || "").trim();
      const email = String(form.get("email") || "").trim();

      if (!name || !email || !email.includes("@")) {
        contactForm.reportValidity();
        return;
      }

      const company = String(form.get("company") || "").trim();
      const phone = String(form.get("phone") || "").trim();
      const product = String(form.get("product") || "").trim();
      const message = String(form.get("message") || "").trim();
      const bodyLines = [
        "Hello Actuade,",
        "",
        "I would like to request information about a subsea pan and tilt unit.",
        "",
        `Name: ${name}`,
        `Company: ${company || "-"}`,
        `Email: ${email}`,
        `Phone: ${phone || "-"}`,
        `Product interest: ${product || "-"}`,
        "",
        "Message:",
        message || "-",
      ];

      const subject = encodeURIComponent("Actuade technical enquiry");
      const mailBody = encodeURIComponent(bodyLines.join("\n"));
      window.location.href = `mailto:post@actuade.no?subject=${subject}&body=${mailBody}`;

      const status = contactForm.querySelector("[data-form-status]");
      if (status) status.classList.add("is-visible");
    });
  }
})();
