// 2600 S 25th Broadview — interactive deck behaviour.
// Paste URLs into LINKS as the team provides them. Until a link is filled in,
// clicking that button shows a "link needed" notice instead of going anywhere.
const LINKS = {
  getToKnowKennedy: "",   // In the Room → "Get to Know Me"
  agencyDashboard: "",    // Accountability → monitor (Comps & Dims)
  competitiveSet: ""      // Competitive Set → monitor
};

(function () {
  document.documentElement.classList.add("js");
  const slides = [...document.querySelectorAll(".slide")];

  // ---- 1920 x 1080 stage -------------------------------------------------
  // Each slide is wrapped in a full-screen .frame and scaled (CSS zoom) to fit.
  // Below 861px wide the CSS falls back to a stacked, fluid layout.
  const STAGE_W = 1920, STAGE_H = 1080;
  slides.forEach(s => {
    const frame = document.createElement("div");
    frame.className = "frame";
    s.before(frame);
    frame.appendChild(s);
  });
  function fit() {
    const scale = Math.min(window.innerWidth / STAGE_W, window.innerHeight / STAGE_H);
    document.documentElement.style.setProperty("--scale", scale.toFixed(4));
  }
  fit();
  window.addEventListener("resize", fit);
  const pad = n => String(n).padStart(2, "0");
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

  // ---- Links -------------------------------------------------------------
  const toastEl = document.getElementById("toast");
  let toastTimer;
  function toast(msg) {
    toastEl.textContent = msg;
    toastEl.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => { toastEl.hidden = true; }, 2600);
  }
  document.querySelectorAll("[data-link]").forEach(el => {
    const url = LINKS[el.dataset.link];
    if (url) {
      el.href = url;
      el.target = "_blank";
      el.rel = "noopener";
    } else {
      el.addEventListener("click", e => { e.preventDefault(); toast("Link needed: add it in deck.js"); });
    }
  });

  // ---- Dot nav + contents menu ------------------------------------------
  const dots = document.getElementById("dots");
  const menuList = document.getElementById("menu-list");
  slides.forEach((s, i) => {
    const label = s.dataset.label || `Slide ${i + 1}`;
    const a = document.createElement("a");
    a.href = `#${s.id}`;
    a.setAttribute("aria-label", label);
    a.innerHTML = `<span>${label}</span>`;
    dots.appendChild(a);

    const li = document.createElement("li");
    li.innerHTML = `<a href="#${s.id}"><span>${pad(i + 1)}</span>${label}</a>`;
    menuList.appendChild(li);
  });
  document.getElementById("count-total").textContent = pad(slides.length);

  const menu = document.getElementById("menu");
  const menuBtn = document.getElementById("menu-open");
  function setMenu(open) {
    menu.hidden = !open;
    menuBtn.setAttribute("aria-expanded", String(open));
    if (open) menu.querySelector("[aria-current='true'], .menu__list a")?.focus();
    else menuBtn.focus();
  }
  menuBtn.addEventListener("click", () => setMenu(true));
  document.getElementById("menu-close").addEventListener("click", () => setMenu(false));
  menu.addEventListener("click", e => {
    if (e.target === menu || e.target.closest(".menu__list a")) setMenu(false);
  });

  // ---- Current slide tracking -------------------------------------------
  let current = 0;
  const bar = document.getElementById("progress-bar");
  function setCurrent(i) {
    current = i;
    document.getElementById("count-now").textContent = pad(i + 1);
    bar.style.width = `${((i + 1) / slides.length) * 100}%`;
    [dots, menuList].forEach(list =>
      list.querySelectorAll("a").forEach((a, j) => a.setAttribute("aria-current", String(j === i))));
  }
  const currentObs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) setCurrent(slides.indexOf(e.target)); });
  }, { rootMargin: "-50% 0px -50% 0px" });
  slides.forEach(s => currentObs.observe(s));

  // ---- Reveal on enter ---------------------------------------------------
  const revealSel = ".eyebrow, .title, .cover__title, .toc li, .person, .timeline__count, .faces li, .numbers__org, " +
    ".panel, .stat, .pillars li, .flow__step, .org, .screens li, .swot__card, .kicker, .lede, .monitor, .todo, .thanks__title, .thanks__logos, " +
    ".layouts__head, .layouts__lead, .layouts__list, .plan";
  slides.forEach(s => s.querySelectorAll(revealSel).forEach((el, i) => {
    el.classList.add("reveal");
    el.style.setProperty("--i", Math.min(i, 14));
  }));
  const revealObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      e.target.classList.add("is-in");
      e.target.querySelectorAll("[data-count]").forEach(countUp);
      revealObs.unobserve(e.target);
    });
  }, { threshold: 0.2 });
  slides.forEach(s => revealObs.observe(s));

  function countUp(el) {
    const end = Number(el.dataset.count);
    if (reduceMotion) { el.textContent = end; return; }
    const t0 = performance.now(), dur = 1400;
    (function tick(t) {
      const p = Math.min(1, (t - t0) / dur);
      el.textContent = Math.round(end * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(tick);
    })(t0);
  }

  // ---- Keyboard ----------------------------------------------------------
  function go(i) {
    const target = slides[Math.max(0, Math.min(slides.length - 1, i))].parentElement;
    target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
  }
  document.addEventListener("keydown", e => {
    if (e.target.closest("input, textarea, select") || e.metaKey || e.ctrlKey || e.altKey) return;
    if (!lightbox.hidden || !menu.hidden) {
      if (e.key === "Escape") { closeLightbox(); if (!menu.hidden) setMenu(false); }
      return;
    }
    const next = ["ArrowDown", "ArrowRight", "PageDown", " "];
    const prev = ["ArrowUp", "ArrowLeft", "PageUp"];
    if (next.includes(e.key) && !e.shiftKey) { e.preventDefault(); go(current + 1); }
    else if (prev.includes(e.key) || (e.key === " " && e.shiftKey)) { e.preventDefault(); go(current - 1); }
    else if (e.key === "Home") { e.preventDefault(); go(0); }
    else if (e.key === "End") { e.preventDefault(); go(slides.length - 1); }
    else if (e.key.toLowerCase() === "m") setMenu(true);
  });

  // ---- Proposed Layouts: bullet <-> unit outline on the plan --------------
  document.querySelectorAll(".layouts").forEach(wrap => {
    const items = wrap.querySelectorAll("[data-unit]");
    const set = unit => items.forEach(el => el.classList.toggle("is-active", el.dataset.unit === unit));
    items.forEach(el => {
      el.addEventListener("mouseenter", () => set(el.dataset.unit));
      el.addEventListener("mouseleave", () => set(null));
      el.addEventListener("focus", () => set(el.dataset.unit));
      el.addEventListener("blur", () => set(null));
    });
  });

  // ---- Lightbox for screenshots -----------------------------------------
  const lightbox = document.getElementById("lightbox");
  const lbImg = document.getElementById("lightbox-img");
  const lbCap = document.getElementById("lightbox-cap");
  let lastShot = null;
  document.querySelectorAll("[data-zoom]").forEach(btn => btn.addEventListener("click", () => {
    lastShot = btn;
    lbImg.src = btn.dataset.zoom;
    lbImg.alt = btn.querySelector("img")?.alt || "";
    lbCap.textContent = btn.dataset.caption || "";
    lightbox.hidden = false;
    document.getElementById("lightbox-close").focus();
  }));
  function closeLightbox() {
    if (lightbox.hidden) return;
    lightbox.hidden = true;
    lastShot?.focus();
  }
  document.getElementById("lightbox-close").addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", e => { if (e.target === lightbox) closeLightbox(); });
})();
