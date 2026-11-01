// Nexora website
// Small interactions only — no framework required.


/* Smooth navigation */

document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", event => {

        const target = document.querySelector(
            link.getAttribute("href")
        );

        if (!target) return;

        event.preventDefault();

        target.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    });

});


/* Navbar background on scroll */

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {

    if (window.scrollY > 40) {

        navbar.style.background =
            "rgba(5, 6, 11, .92)";

    } else {

        navbar.style.background =
            "rgba(5, 6, 11, .72)";

    }

});


/* Reveal sections when they enter the screen */

const revealItems = document.querySelectorAll(
    ".feature-card, .game-card, .download-card, .release, .nexis-card-large"
);

const observer = new IntersectionObserver(
    entries => {

        entries.forEach(entry => {

            if (!entry.isIntersecting) return;

            entry.target.classList.add("revealed");

            observer.unobserve(entry.target);

        });

    },
    {
        threshold: 0.12
    }
);


revealItems.forEach(item => {

    item.style.opacity = "0";
    item.style.transform = "translateY(18px)";
    item.style.transition =
        "opacity .6s ease, transform .6s ease";

    observer.observe(item);

});


/* Reveal animation */

const style = document.createElement("style");

style.textContent = `
    .revealed {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;

document.head.appendChild(style);


/* Current year */

const yearElements =
    document.querySelectorAll(".copyright");

yearElements.forEach(element => {

    element.innerHTML =
        element.innerHTML.replace(
            "2026",
            new Date().getFullYear()
        );

});
