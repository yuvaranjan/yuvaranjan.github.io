/* ============================================================
   INK & SIGNAL — interactions
   Progressive enhancement: the page is fully usable without JS.
   ============================================================ */

// Enable the JS-only reveal states (CSS hides .reveal only under .js)
document.documentElement.classList.remove("no-js");
document.documentElement.classList.add("js");

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---- Responsive nav ------------------------------------- */
const menuBtn = document.querySelector(".menu-btn");
const navigation = document.querySelector(".navigation");

if (menuBtn && navigation) {
  const toggleNav = (open) => {
    const isOpen = open ?? !navigation.classList.contains("active");
    navigation.classList.toggle("active", isOpen);
    menuBtn.classList.toggle("active", isOpen);
    menuBtn.setAttribute("aria-expanded", String(isOpen));
  };

  menuBtn.addEventListener("click", () => toggleNav());
  navigation.querySelectorAll("a").forEach((link) =>
    link.addEventListener("click", () => toggleNav(false))
  );
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") toggleNav(false);
  });
}

/* ---- Scroll progress bar -------------------------------- */
const scrollProgress = document.querySelector("#scroll-progress");
if (scrollProgress) {
  const updateProgress = () => {
    const doc = document.documentElement;
    const scrollable = doc.scrollHeight - doc.clientHeight;
    const pct = scrollable > 0 ? (doc.scrollTop / scrollable) * 100 : 0;
    scrollProgress.style.width = pct + "%";
  };
  document.addEventListener("scroll", updateProgress, { passive: true });
  updateProgress();
}

/* ---- Scroll-to-top -------------------------------------- */
const scrollBtn = document.querySelector(".scrollToTop-btn");
if (scrollBtn) {
  window.addEventListener(
    "scroll",
    () => scrollBtn.classList.toggle("active", window.scrollY > 500),
    { passive: true }
  );
  scrollBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
  });
}

/* ---- Reveal-on-scroll ----------------------------------- */
const reveals = document.querySelectorAll(".reveal");
if (reveals.length) {
  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    reveals.forEach((el) => el.classList.add("is-visible"));
  } else {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target); // reveal once, then stop
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );
    reveals.forEach((el) => revealObserver.observe(el));
  }
}

/* ---- Skill meters --------------------------------------- */
const meters = document.querySelectorAll(".meter");
if (meters.length) {
  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    meters.forEach((el) => el.classList.add("is-visible"));
  } else {
    const meterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            meterObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 }
    );
    meters.forEach((el) => meterObserver.observe(el));
  }
}
