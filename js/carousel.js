// ============================================================
// CodeLoop — Testimonials Carousel JS
// Auto-scroll, drag/swipe, dot navigation
// ============================================================

(function () {
  'use strict';

  window.initCarousel = function() {
    const track = document.querySelector('.testimonials__track');
    const cards = document.querySelectorAll('.testimonial-card');
    let prevBtn = document.querySelector('.carousel-btn--prev');
    let nextBtn = document.querySelector('.carousel-btn--next');
    const dotsContainer = document.querySelector('.carousel-dots');

    if (!track || !cards.length) return;

    // Remove old listeners by replacing buttons
    if (prevBtn) {
      const newPrev = prevBtn.cloneNode(true);
      prevBtn.replaceWith(newPrev);
      prevBtn = newPrev;
    }
    if (nextBtn) {
      const newNext = nextBtn.cloneNode(true);
      nextBtn.replaceWith(newNext);
      nextBtn = newNext;
    }

    let currentIndex = 0;
    let autoScrollTimer = null;
    let isDragging = false;
    let startX = 0;
    let translateX = 0;
    const CARDS_VISIBLE = window.innerWidth >= 1024 ? 3 : window.innerWidth >= 768 ? 2 : 1;
    const totalSlides = Math.max(0, cards.length - CARDS_VISIBLE + 1);

    // ── Create Dots ──
    function createDots() {
      if (!dotsContainer) return;
      dotsContainer.innerHTML = '';
      if (totalSlides <= 1) return;
      for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('button');
        dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
        dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
        dot.addEventListener('click', () => goTo(i));
        dotsContainer.appendChild(dot);
      }
    }

    function updateDots() {
      document.querySelectorAll('.carousel-dot').forEach((dot, i) => {
        dot.classList.toggle('active', i === currentIndex);
      });
    }

    // ── Go to slide ──
    function goTo(index) {
      if (totalSlides <= 1) return;
      currentIndex = Math.max(0, Math.min(index, totalSlides - 1));
      const cardWidth = cards[0]?.offsetWidth || 0;
      const gap = 24; // 1.5rem
      translateX = -(currentIndex * (cardWidth + gap));

      gsap.to(track, {
        x: translateX,
        duration: 0.6,
        ease: 'power2.out',
      });

      updateDots();
      updateButtons();
    }

    function goNext() {
      if (totalSlides <= 1) return;
      const next = currentIndex < totalSlides - 1 ? currentIndex + 1 : 0;
      goTo(next);
    }

    function goPrev() {
      if (totalSlides <= 1) return;
      const prev = currentIndex > 0 ? currentIndex - 1 : totalSlides - 1;
      goTo(prev);
    }

    function updateButtons() {
      if (prevBtn) prevBtn.style.opacity = currentIndex === 0 ? '0.4' : '1';
      if (nextBtn) nextBtn.style.opacity = currentIndex === totalSlides - 1 ? '0.4' : '1';
    }

    // ── Auto Scroll ──
    function startAutoScroll() {
      stopAutoScroll();
      if (totalSlides > 1) {
        autoScrollTimer = setInterval(goNext, 5000);
      }
    }

    function stopAutoScroll() {
      if (autoScrollTimer) clearInterval(autoScrollTimer);
    }

    // ── Event Listeners ──
    if (prevBtn) prevBtn.addEventListener('click', () => { goPrev(); startAutoScroll(); });
    if (nextBtn) nextBtn.addEventListener('click', () => { goNext(); startAutoScroll(); });

    // Drag / Touch listeners on track
    if (!track.dataset.dragInit) {
      track.dataset.dragInit = 'true';
      
      track.addEventListener('mousedown', (e) => {
        if (totalSlides <= 1) return;
        isDragging = true;
        startX = e.clientX;
        stopAutoScroll();
      });

      document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        const diff = e.clientX - startX;
        gsap.to(track, { x: translateX + diff, duration: 0.1 });
      });

      document.addEventListener('mouseup', (e) => {
        if (!isDragging) return;
        isDragging = false;
        const diff = e.clientX - startX;
        if (Math.abs(diff) > 50) {
          if (diff < 0) goNext();
          else goPrev();
        } else {
          goTo(currentIndex);
        }
        startAutoScroll();
      });

      track.addEventListener('touchstart', (e) => {
        if (totalSlides <= 1) return;
        isDragging = true;
        startX = e.touches[0].clientX;
        stopAutoScroll();
      }, { passive: true });

      document.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        const diff = e.touches[0].clientX - startX;
        gsap.to(track, { x: translateX + diff, duration: 0.1 });
      });

      document.addEventListener('touchend', (e) => {
        if (!isDragging) return;
        isDragging = false;
        const diff = e.changedTouches[0].clientX - startX;
        if (Math.abs(diff) > 50) {
          if (diff < 0) goNext();
          else goPrev();
        } else {
          goTo(currentIndex);
        }
        startAutoScroll();
      });
    }

    // ── Init ──
    createDots();
    updateButtons();
    startAutoScroll();
  };

  // Run on first load
  window.initCarousel();

  // Resize handler
  window.addEventListener('resize', () => {
    clearTimeout(window.carouselResizeTimer);
    window.carouselResizeTimer = setTimeout(() => {
      window.initCarousel();
    }, 250);
  });

})();
