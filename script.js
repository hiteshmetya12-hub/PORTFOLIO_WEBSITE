// 1. Initialize EmailJS
(function () {
    // IMPORTANT: REPLACE WITH YOUR ACTUAL KEY
    emailjs.init("YOUR_PUBLIC_KEY");
})();

// 2. Typewriter Effect
const words = ["Developer.", "Designer.", "Freelancer."];
let i = 0;
let timer;

function typeWriter() {
    const heading = document.getElementById("typewriter");
    const word = words[i];
    let current = heading.innerText;

    if (current.length < word.length) {
        heading.innerText = word.substring(0, current.length + 1);
        timer = setTimeout(typeWriter, 100);
    } else {
        setTimeout(erase, 2000);
    }
}

function erase() {
    const heading = document.getElementById("typewriter");
    let current = heading.innerText;

    if (current.length > 0) {
        heading.innerText = current.substring(0, current.length - 1);
        timer = setTimeout(erase, 50);
    } else {
        i = (i + 1) % words.length;
        setTimeout(typeWriter, 500);
    }
}

// 3. Advanced Scroll Reveal (Intersection Observer)
const observerOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("reveal-visible");
            observer.unobserve(entry.target); // Only animate once for better performance
        }
    });
}, observerOptions);

document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".reveal-el").forEach((el) => observer.observe(el));
    typeWriter();
    document.getElementById("year").innerText = new Date().getFullYear();
});

// 4. Mobile Menu Logic
const menuBtn = document.getElementById("menu-btn");
const mobileMenu = document.getElementById("mobile-menu");
const body = document.body;
let isMenuOpen = false;

function toggleMenu() {
    isMenuOpen = !isMenuOpen;
    if (isMenuOpen) {
        mobileMenu.classList.add("mobile-menu-open");
        menuBtn.classList.add("nav-active");
        body.style.overflow = "hidden";
    } else {
        mobileMenu.classList.remove("mobile-menu-open");
        menuBtn.classList.remove("nav-active");
        body.style.overflow = "auto";
    }
}

menuBtn.addEventListener("click", toggleMenu);

document.querySelectorAll(".mobile-link").forEach((link) => {
    link.addEventListener("click", () => {
        if (isMenuOpen) toggleMenu();
    });
});

// 5. Navbar Scroll Shadow Effect
window.addEventListener("scroll", () => {
    const nav = document.getElementById("navbar");
    if (window.scrollY > 20) {
        nav.classList.add("glass-nav");
        nav.classList.add("shadow-sm");
    } else {
        nav.classList.remove("glass-nav");
        nav.classList.remove("shadow-sm");
    }
});

// 6. Contact Form Handling
document.getElementById("contact-form").addEventListener("submit", function (event) {
    event.preventDefault();

    const btn = document.getElementById("submit-btn");
    const originalText = btn.innerHTML;
    const successMsg = document.getElementById("success-msg");
    const errorMsg = document.getElementById("error-msg");

    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    btn.disabled = true;

    // REPLACE 'YOUR_SERVICE_ID' AND 'YOUR_TEMPLATE_ID'
    emailjs.sendForm("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", this).then(
        function () {
            btn.innerHTML = "Message Sent";
            btn.classList.add("bg-green-600");
            successMsg.classList.remove("hidden");
            document.getElementById("contact-form").reset();
            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.disabled = false;
                btn.classList.remove("bg-green-600");
                successMsg.classList.add("hidden");
            }, 5000);
        },
        function (error) {
            console.log("FAILED...", error);
            btn.innerHTML = originalText;
            btn.disabled = false;
            errorMsg.classList.remove("hidden");
        }
    );
});
