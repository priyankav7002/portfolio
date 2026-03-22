document.addEventListener("DOMContentLoaded", () => {
    const portfolioGrid = document.querySelector(".portfolio-grid");
    const filterButtons = document.querySelectorAll(".filter-btn");
    const loadMoreBtn = document.getElementById("loadMoreBtn");

    let allImages = [];
    let visibleCount = 10;
    let currentFilter = "all";

    /* FETCH JSON */
    async function loadImages() {
        try {
            const response = await fetch("./assets/data/images.json");
            allImages = await response.json();
            renderImages();
        } catch (error) {
            portfolioGrid.innerHTML = "<p style='color:red;text-align:center;'>Failed to load images. Check JSON path.</p>";
            console.error("Failed to load images:", error);
        }
    }

    /* FILTER */
    function getFilteredImages() {
        if (currentFilter === "all") return allImages;
        return allImages.filter(img => img.category === currentFilter);
    }

    /* RENDER */
    function renderImages() {
        const filtered = getFilteredImages();

        portfolioGrid.innerHTML = "";

        const imagesToShow = filtered.slice(0, visibleCount);

        imagesToShow.forEach(img => {
            const item = document.createElement("div");
            item.className = "portfolio-item";

            item.innerHTML = `
                <img src="${img.src}" alt="Design work" loading="lazy">
            `;

            portfolioGrid.appendChild(item);
        });

        /* SHOW / HIDE BUTTON */
        if (visibleCount >= filtered.length) {
            loadMoreBtn.style.display = "none";
        } else {
            loadMoreBtn.style.display = "inline-block";
        }
    }

    /* LOAD MORE */
    loadMoreBtn.addEventListener("click", () => {
        visibleCount += 10;
        renderImages();
    });

    /* FILTER BUTTONS */
    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            filterButtons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");

            currentFilter = button.textContent.trim().toLowerCase();
            visibleCount = 10;

            renderImages();
        });
    });

    loadImages();
});