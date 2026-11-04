// Nexora website — small interactions only, no framework.
// Smooth scrolling and anchor offsets are handled in CSS (scroll-behavior + scroll-margin-top).


/* Navbar background on scroll */

const navbar = document.querySelector(".navbar");

const updateNavbar = () => {
    navbar.classList.toggle("scrolled", window.scrollY > 40);
};

updateNavbar();
window.addEventListener("scroll", updateNavbar, { passive: true });


/* Reveal cards when they enter the screen */

const revealItems = document.querySelectorAll(
    ".feature-card, .game-card, .nexei-card, .avatar-list, .download-card"
);

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if ("IntersectionObserver" in window && !reduceMotion) {

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
        });
    }, { threshold: 0.12 });

    revealItems.forEach(item => {
        item.classList.add("reveal");
        observer.observe(item);
    });
}


/* Current year */

const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();
