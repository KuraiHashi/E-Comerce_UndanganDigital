(() => {
  "use strict";

  const templates = [
    { id: "sorella", name: "Sorella", category: "Pernikahan", package: "Premium", price: "Rp119.000", description: "Palet lembut dan detail klasik untuk kisah yang terasa abadi.", image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=900&q=85" },
    { id: "solenne", name: "Solenne", category: "Pernikahan", package: "Basic", price: "Rp25.000", description: "Siluet editorial yang sederhana, hangat, dan penuh karakter.", image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=900&q=85" },
    { id: "amora", name: "Amora", category: "Pernikahan", package: "Free", price: "Gratis", description: "Sentuhan bunga dan warna natural untuk momen istimewa.", image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=900&q=85" },
    { id: "bunga-kertas", name: "Bunga Kertas", category: "Pernikahan", package: "Premium", price: "Rp119.000", description: "Undangan klasik dengan nuansa hangat dan detail floral.", image: "https://images.unsplash.com/photo-1511988617509-a57c8a288659?auto=format&fit=crop&w=900&q=85" },
    { id: "sunday-club", name: "Sunday Club", category: "Ulang Tahun", package: "Basic", price: "Rp25.000", description: "Perayaan penuh warna untuk hari yang terasa seru.", image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=900&q=85" },
    { id: "little-bloom", name: "Little Bloom", category: "Khitanan / Aqiqah", package: "Free", price: "Gratis", description: "Lembut, manis, dan hangat untuk menyambut momen keluarga.", image: "https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=900&q=85" },
    { id: "syukur-keluarga", name: "Syukur Keluarga", category: "Tasyakuran / Syukuran", package: "Basic", price: "Rp25.000", description: "Desain hangat untuk berbagi kabar bahagia bersama keluarga.", image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=900&q=85" },
    { id: "the-next-chapter", name: "The Next Chapter", category: "Acara Umum", package: "Basic", price: "Rp25.000", description: "Cara personal untuk merayakan langkah baru dan semua usaha.", image: "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&w=900&q=85" },
    { id: "atelier-talks", name: "Atelier Talks", category: "Acara Umum", package: "Premium", price: "Rp119.000", description: "Tampilan modern untuk ide-ide yang layak dibagikan.", image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=900&q=85" },
    { id: "together-we", name: "Together, We", category: "Acara Umum", package: "Free", price: "Gratis", description: "Undangan yang rapi dan akrab untuk berkumpul dan bertumbuh.", image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=900&q=85" }
  ];

  const grid = document.getElementById("templateGrid");
  const emptyState = document.getElementById("emptyTemplates");
  const previewElement = document.getElementById("templatePreview");
  const toastElement = document.getElementById("siteToast");
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let activeCategory = "Pernikahan";
  let selectedTemplate = null;
  let previewModal = null;
  let siteToast = null;

  if (window.bootstrap) {
    previewModal = new window.bootstrap.Modal(previewElement);
    siteToast = new window.bootstrap.Toast(toastElement, { delay: 3200 });
  }

  function showToast(message) {
    document.getElementById("toastMessage").textContent = message;
    if (siteToast) siteToast.show();
  }

  function escapeHtml(value) {
    return value.replace(/[&<>"']/g, (character) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;"
    })[character]);
  }

  function renderTemplates() {
    const visibleTemplates = templates.filter((template) => {
      return template.category === activeCategory;
    });

    grid.innerHTML = visibleTemplates.map((template) => `
      <article class="template-card">
        <div class="template-image-wrap">
          <img class="template-image" src="${template.image}" alt="Preview template ${escapeHtml(template.name)}" loading="lazy">
          <span class="template-badge">${escapeHtml(template.package)}</span>
        </div>
        <div class="template-info">
          <div><h3>${escapeHtml(template.name)}</h3><span class="template-category">${escapeHtml(template.category)}</span></div>
        </div>
        <div class="template-offer"><span>PAKET ${escapeHtml(template.package.toLocaleUpperCase("id"))}</span><strong>${escapeHtml(template.price)}</strong></div>
        <div class="template-actions">
          <button type="button" data-preview="${escapeHtml(template.id)}"><i class="bi bi-eye"></i> Live Preview</button>
          <button type="button" class="order-template" data-order="${escapeHtml(template.id)}">Pesan sekarang <i class="bi bi-arrow-right"></i></button>
        </div>
      </article>
    `).join("");
    emptyState.classList.toggle("d-none", visibleTemplates.length !== 0);
    grid.classList.toggle("d-none", visibleTemplates.length === 0);
    document.getElementById("designCount").textContent = String(visibleTemplates.length);
  }

  function setCategory(category) {
    activeCategory = category;
    document.querySelectorAll("[data-filter-category]").forEach((button) => {
      const active = button.dataset.filterCategory === category;
      button.classList.toggle("active", active);
      button.setAttribute("aria-pressed", String(active));
    });
    renderTemplates();
  }

  function openPreview(template, useImmediately = false) {
    selectedTemplate = template;
    document.getElementById("previewImage").src = template.image;
    document.getElementById("previewImage").alt = `Preview desain ${template.name}`;
    document.getElementById("previewCategory").textContent = template.category.toLocaleUpperCase("id");
    document.getElementById("previewTitle").textContent = template.name;
    document.getElementById("previewDescription").textContent = template.description;
    document.getElementById("previewPackage").textContent = `Paket ${template.package}`;
    document.getElementById("previewPrice").textContent = template.price;

    if (previewModal) {
      previewModal.show();
      if (useImmediately) {
        previewElement.addEventListener("shown.bs.modal", () => document.getElementById("previewUseButton").focus(), { once: true });
      }
    } else {
      showToast(`Preview ${template.name} siap dilihat.`);
    }
  }

  function handleTemplateAction(event) {
    const previewButton = event.target.closest("[data-preview]");
    const orderButton = event.target.closest("[data-order]");
    const templateId = previewButton?.dataset.preview || orderButton?.dataset.order;
    if (!templateId) return;
    const template = templates.find((item) => item.id === templateId);
    if (!template) return;
    if (previewButton) openPreview(template);
    if (orderButton) showToast(`Pesan ${template.name} · ${template.price}. Simulasi frontend, belum ada transaksi.`);
  }

  grid.addEventListener("click", handleTemplateAction);
  document.querySelector(".promo-card").addEventListener("click", handleTemplateAction);

  document.querySelectorAll("[data-filter-category]").forEach((button) => {
    button.addEventListener("click", () => setCategory(button.dataset.filterCategory));
  });

  document.getElementById("previewUseButton").addEventListener("click", () => {
    if (!selectedTemplate) return;
    previewModal?.hide();
    showToast(`Pesan ${selectedTemplate.name} · ${selectedTemplate.price}. Simulasi frontend, belum ada transaksi.`);
  });

  document.querySelectorAll("[data-demo-toast]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      showToast(button.dataset.demoToast);
    });
  });

  document.querySelectorAll("#mainNavigation .nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      const navigation = document.getElementById("mainNavigation");
      if (window.bootstrap && navigation.classList.contains("show")) {
        window.bootstrap.Collapse.getOrCreateInstance(navigation).hide();
      }
    });
  });

  function setupScrollParallax() {
    if (prefersReducedMotion) return;
    const scene = document.querySelector(".hero-section");
    const layers = scene.querySelectorAll("[data-scroll-speed]");
    let frame = 0;

    function updateLayers() {
      const progress = Math.min(Math.max((window.scrollY - scene.offsetTop) / scene.offsetHeight, 0), 1);
      layers.forEach((layer) => {
        const speed = Number(layer.dataset.scrollSpeed);
        layer.style.setProperty("--scroll-y", `${(-progress * speed * 650).toFixed(1)}px`);
      });
      frame = 0;
    }

    function scheduleUpdate() {
      if (frame) return;
      frame = requestAnimationFrame(updateLayers);
    }

    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    updateLayers();
  }

  function setupScrollReveal() {
    if (prefersReducedMotion || !("IntersectionObserver" in window)) return;

    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -36px 0px" });

    function observeReveal(elements) {
      const delaysByParent = new Map();
      elements.forEach((element) => {
        if (element.classList.contains("reveal-on-scroll")) return;
        const parent = element.parentElement;
        const index = delaysByParent.get(parent) || 0;
        delaysByParent.set(parent, index + 1);
        element.style.setProperty("--reveal-delay", `${Math.min(index * 85, 340)}ms`);
        element.classList.add("reveal-on-scroll");
        revealObserver.observe(element);
      });
    }

    observeReveal(document.querySelectorAll(
      ".category-section .stats-intro, .category-section .stats-grid, " +
      ".template-heading, .template-toolbar, .template-card, .catalog-included, .template-footnote, " +
      ".minute-flow-head, .quick-step, .quote-container, .promo-copy, .promo-card, .footer-main, .footer-bottom"
    ));

    new MutationObserver(() => {
      observeReveal(document.querySelectorAll("#templateGrid .template-card"));
    }).observe(grid, { childList: true });
  }

  function setupActiveNavigation() {
    const header = document.querySelector(".site-header");
    const navigationLinks = [...document.querySelectorAll("#mainNavigation .nav-link[href^='#']")];
    const sections = navigationLinks
      .map((link) => document.querySelector(link.getAttribute("href")))
      .filter(Boolean);
    let frame = 0;

    function updateActiveLink() {
      const activationLine = window.scrollY + header.offsetHeight + 90;
      let activeSection = sections[0];
      sections.forEach((section) => {
        if (section.offsetTop <= activationLine) activeSection = section;
      });

      navigationLinks.forEach((link) => {
        const active = link.getAttribute("href") === `#${activeSection.id}`;
        link.classList.toggle("active", active);
        if (active) link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
      });
      frame = 0;
    }

    function scheduleUpdate() {
      if (frame) return;
      frame = requestAnimationFrame(updateActiveLink);
    }

    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    updateActiveLink();
  }

  renderTemplates();
  document.querySelector('[data-stat="designs"]').textContent = String(templates.length);
  document.getElementById("designCount").textContent = String(templates.filter((template) => template.category === activeCategory).length);
  setupScrollParallax();
  setupScrollReveal();
  setupActiveNavigation();
})();
