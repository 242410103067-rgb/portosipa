// === NAVBAR SCROLL EFFECT ===
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// === SMOOTH SCROLL NAVIGATION ===
const navLinks = document.querySelectorAll('.nav-links a');

navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = link.getAttribute('href').substring(1);
    const targetSection = document.getElementById(targetId);

    if (targetSection) {
      window.scrollTo({
        top: targetSection.offsetTop - 60, // biar ga ketutupan navbar
        behavior: 'smooth'
      });
    }
  });
});

// === ACTIVE MENU HIGHLIGHT ===
const sections = document.querySelectorAll("section");
window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 70;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href").substring(1) === current) {
      link.classList.add("active");
    }
  });
});

// === OPTIONAL: HAMBURGER MENU (buat HP) ===
const burger = document.createElement('div');
burger.classList.add('burger');
burger.innerHTML = "&#9776;"; // icon ☰
document.querySelector('.navbar').appendChild(burger);

burger.addEventListener('click', () => {
  document.querySelector('.nav-links').classList.toggle('show');
});

// === ABOUT IMAGE FLOAT ANIMATION ===
const aboutImg = document.querySelector(".about-image img");

if (aboutImg) {
  // Bikin gambar bulat + bingkai lewat JS
  aboutImg.style.borderRadius = "50%";
  aboutImg.style.border = "4px solid #fb6262ff";
  aboutImg.style.objectFit = "cover";

  let angle = 0; // sudut awal
  function float() {
    angle += 0.02; // kecepatan gerak
    const y = Math.sin(angle) * 12; // naik-turun max 12px
    aboutImg.style.transform = `translateY(${y}px)`;
    requestAnimationFrame(float);
  }
  float();
}

// === ABOUT ME TEXT REVEAL ===
const aboutElements = document.querySelectorAll(".about-text h3, .about-text p");

const aboutObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      // tambahin delay biar muncul berurutan
      setTimeout(() => {
        entry.target.classList.add("show");
      }, index * 200); // delay 200ms tiap elemen
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.2
});

aboutElements.forEach(el => {
  aboutObserver.observe(el);
});

