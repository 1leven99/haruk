// ===== Language Toggle =====
const langToggle = document.querySelector('.lang-toggle');
const htmlEl = document.documentElement;

function getLang() {
  const params = new URLSearchParams(window.location.search);
  return params.get('lang') === 'en' ? 'en' : 'ko';
}

function setLang(lang) {
  htmlEl.setAttribute('lang', lang);
  document.body.setAttribute('data-lang', lang);
  langToggle.textContent = lang === 'ko' ? 'EN' : 'KO';

  // Update nav link text
  document.querySelectorAll('.nav-links a[data-ko]').forEach(a => {
    a.textContent = lang === 'ko' ? a.dataset.ko : a.dataset.en;
  });

  // Update page title
  document.title = lang === 'ko'
    ? 'haru K — 가족 모두가 함께하는 일상을 담았습니다'
    : 'haru K — Everyday moments shared by the whole family';

  // Update URL without reload
  const url = new URL(window.location);
  if (lang === 'en') {
    url.searchParams.set('lang', 'en');
  } else {
    url.searchParams.delete('lang');
  }
  history.replaceState(null, '', url);
}

// Initialize language
setLang(getLang());

// Toggle on click
langToggle.addEventListener('click', () => {
  const current = document.body.getAttribute('data-lang') || 'ko';
  setLang(current === 'ko' ? 'en' : 'ko');
});

// ===== Header scroll effect =====
const header = document.querySelector('.header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 50);
});

// ===== Mobile menu toggle =====
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  menuToggle.classList.toggle('active');
});

// Close mobile menu on link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
    menuToggle.classList.remove('active');
  });
});

// ===== Scroll fade-in animation =====
const fadeElements = document.querySelectorAll('.fade-in');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, {
  threshold: 0.15
});

fadeElements.forEach(el => observer.observe(el));
