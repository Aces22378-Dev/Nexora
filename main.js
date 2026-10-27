
document.addEventListener("DOMContentLoaded", () => {
    const navbar = document.getElementById("navbar");
    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");
    const currentYear = document.getElementById("currentYear");
    const toast = document.getElementById("toast");

    // Update the footer year.
    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }

    // Navigation bar appearance on scroll.
    function updateNavbar() {
        if (!navbar) return;
        navbar.classList.toggle("scrolled", window.scrollY > 20);
    }

    updateNavbar();
    window.addEventListener("scroll", updateNavbar, { passive: true });

    // Mobile navigation.
    function closeMenu() {
        if (!menuToggle || !navLinks) return;

        navLinks.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation");
    }

    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", () => {
            const isOpen = navLinks.classList.toggle("open");

            menuToggle.setAttribute("aria-expanded", String(isOpen));
            menuToggle.setAttribute(
                "aria-label",
                isOpen ? "Close navigation" : "Open navigation"
            );
        });

        navLinks.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", closeMenu);
        });

        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape") {
                closeMenu();
            }
        });

        document.addEventListener("click", (event) => {
            if (
                navLinks.classList.contains("open") &&
                !navLinks.contains(event.target) &&
                !menuToggle.contains(event.target)
            ) {
                closeMenu();
            }
        });
    }

    // Smooth scrolling for internal links.
    document.querySelectorAll('a[href^="#"]').forEach((link) => {
        link.addEventListener("click", (event) => {
            const href = link.getAttribute("href");

            if (!href || href === "#") return;

            const target = document.querySelector(href);

            if (!target) return;

            event.preventDefault();

            target.scrollIntoView({
                behavior: window.matchMedia(
                    "(prefers-reduced-motion: reduce)"
                ).matches ? "auto" : "smooth",
                block: "start"
            });
        });
    });

    // Highlight the navigation link for the current section.
    const pageSections = document.querySelectorAll("main section[id]");
    const sectionLinks = document.querySelectorAll(
        '.nav-links a[href^="#"]'
    );

    if ("IntersectionObserver" in window) {
        const sectionObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;

                    sectionLinks.forEach((link) => {
                        const active =
                            link.getAttribute("href") ===
                            `#${entry.target.id}`;

                        link.classList.toggle("active", active);
                    });
                });
            },
            {
                rootMargin: "-25% 0px -60% 0px",
                threshold: 0
            }
        );

        pageSections.forEach((section) => {
            sectionObserver.observe(section);
        });
    }

    // Small notification helper.
    let toastTimer;

    function showToast(message) {
        if (!toast) return;

        toast.textContent = message;
        toast.classList.add("show");

        clearTimeout(toastTimer);

        toastTimer = setTimeout(() => {
            toast.classList.remove("show");
        }, 3000);
    }

    // Download feedback. The browser still handles the download.
    document.querySelectorAll(
        'a[href*="Nexora.exe"]'
    ).forEach((link) => {
        link.addEventListener("click", () => {
            showToast("Opening the Nexora Alpha download...");
        });
    });

    // Reveal the notification only for external release links.
    document.querySelectorAll(
        'a[href*="/releases/tag/Alpha"]'
    ).forEach((link) => {
        link.addEventListener("click", () => {
            showToast("Opening the Nexora Alpha release...");
        });
    });

    console.info("Nexora website ready.");
});
