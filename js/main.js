/* =========================
   MAIN JAVASCRIPT FILE (OPTIMIZED & FIXED)
========================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =========================
       CACHE DOM ELEMENTS
    ========================= */

    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-links a");
    const progressBar = document.getElementById("scroll-progress");
    const backToTopBtn = document.getElementById("backToTop");

    // 🔥 FIX: select sections for reveal
    const revealElements = document.querySelectorAll(".section");

    let ticking = false;

    /* =========================
       ACTIVE NAV LINK ON SCROLL
    ========================= */

    function updateActiveNav() {
        let currentSection = "";

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            if (window.scrollY >= sectionTop) {
                currentSection = section.id;
            }
        });

        navLinks.forEach(link => {
            link.classList.toggle(
                "active",
                link.getAttribute("href") === `#${currentSection}`
            );
        });
    }

    /* =========================
       SMOOTH SCROLL (NAV)
    ========================= */

    navLinks.forEach(link => {
        link.addEventListener("click", e => {
            const targetId = link.getAttribute("href");
            if (!targetId.startsWith("#")) return;

            e.preventDefault();
            const target = document.querySelector(targetId);
            if (!target) return;

            target.scrollIntoView({ behavior: "smooth" });
        });
    });

    /* =========================
       SCROLL PROGRESS BAR
    ========================= */

    function updateScrollProgress() {
        if (!progressBar) return;

        const scrollTop = window.scrollY;
        const docHeight =
            document.documentElement.scrollHeight - window.innerHeight;

        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = `${scrollPercent}%`;
    }

    /* =========================
       BACK TO TOP BUTTON
    ========================= */

    function toggleBackToTop() {
        if (!backToTopBtn) return;

        backToTopBtn.classList.toggle("show", window.scrollY > 400);
    }

    backToTopBtn?.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    /* =========================
       SCROLL REVEAL ANIMATION
    ========================= */

    function revealOnScroll() {
        revealElements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            const revealPoint = 100;

            if (elementTop < window.innerHeight - revealPoint) {
                el.classList.add("reveal", "active");
            }
        });
    }

    /* =========================
       MASTER SCROLL HANDLER
       (PERFORMANCE OPTIMIZED)
    ========================= */

    function onScroll() {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                updateActiveNav();
                updateScrollProgress();
                toggleBackToTop();
                revealOnScroll();
                ticking = false;
            });
            ticking = true;
        }
    }

    window.addEventListener("scroll", onScroll);

    /* =========================
       INITIAL RUN
    ========================= */

    onScroll();
    revealOnScroll();

    console.log("Main JS loaded successfully");
});
