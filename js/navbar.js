// ============================================================
// CodeLoop — Navbar JS
// Sticky scroll effect, mobile hamburger, active link tracking
// ============================================================

(function () {
  'use strict';

  const navbar = document.querySelector('.navbar');
  const hamburger = document.querySelector('.navbar__hamburger');
  const mobileMenu = document.querySelector('.navbar__mobile');
  const overlay = document.querySelector('.mobile-overlay');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  // ── Scroll-based Navbar Effect ──
  let lastScrollY = 0;
  let ticking = false;

  function onScroll() {
    lastScrollY = window.scrollY;
    if (!ticking) {
      window.requestAnimationFrame(updateNavbar);
      ticking = true;
    }
  }

  function updateNavbar() {
    if (lastScrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    ticking = false;
    updateActiveLink();
  }

  window.addEventListener('scroll', onScroll, { passive: true });

  // ── Mobile Menu Toggle ──
  function openMenu() {
    mobileMenu.classList.add('open');
    hamburger.classList.add('open');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    hamburger.setAttribute('aria-expanded', 'true');
  }

  function closeMenu() {
    mobileMenu.classList.remove('open');
    hamburger.classList.remove('open');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
    hamburger.setAttribute('aria-expanded', 'false');
  }

  hamburger?.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.contains('open');
    isOpen ? closeMenu() : openMenu();
  });

  overlay?.addEventListener('click', closeMenu);

  // Close mobile menu on ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu?.classList.contains('open')) {
      closeMenu();
    }
  });

  // ── Active Section Tracking ──
  function updateActiveLink() {
    let current = '';
    const scrollY = window.scrollY + 100;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionH = section.offsetHeight;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionH) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      const href = link.getAttribute('href');
      if (href && href.slice(1) === current) {
        link.classList.add('active');
      }
    });
  }

  // ── Logo scroll to top ──
  document.querySelector('.navbar__logo')?.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Init
  updateNavbar();
})();
