/* =========================
   THEME TOGGLE LOGIC (OPTIMIZED + ACCESSIBLE)
========================= */

document.addEventListener("DOMContentLoaded", () => {
    const themeToggleBtn = document.getElementById("theme-toggle");
    const body = document.body;

    if (!themeToggleBtn) return;

    /* =========================
       APPLY THEME
    ========================= */

    function applyTheme(isDark) {
        body.classList.toggle("dark-theme", isDark);

        themeToggleBtn.textContent = isDark ? "☀️" : "🌙";
        themeToggleBtn.setAttribute(
            "aria-label",
            isDark ? "Switch to light theme" : "Switch to dark theme"
        );
        themeToggleBtn.setAttribute("aria-pressed", isDark);
        themeToggleBtn.title = isDark ? "Light mode" : "Dark mode";
    }

    /* =========================
       LOAD SAVED / SYSTEM THEME
    ========================= */

    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    const isDarkMode =
        savedTheme === "dark" ||
        (savedTheme === null && prefersDark);

    applyTheme(isDarkMode);

    /* =========================
       TOGGLE THEME
    ========================= */

    themeToggleBtn.addEventListener("click", () => {
        const isDark = !body.classList.contains("dark-theme");

        applyTheme(isDark);
        localStorage.setItem("theme", isDark ? "dark" : "light");
    });

    console.log("Theme toggle loaded");
});
