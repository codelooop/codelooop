// ============================================================
// CodeLoop — Portfolio Filter JS
// Isotope-style filter with GSAP animations
// ============================================================

(function () {
  'use strict';

  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioGrid = document.querySelector('.portfolio__grid');
  const cards = document.querySelectorAll('.portfolio-card');

  if (!filterBtns.length || !portfolioGrid) return;

  let currentFilter = 'all';
  let isAnimating = false;

  // ── Filter Logic ──
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (isAnimating) return;

      const filter = btn.getAttribute('data-filter');
      if (filter === currentFilter) return;

      // Update active state
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentFilter = filter;

      filterCards(filter);
    });
  });

  function filterCards(filter) {
    isAnimating = true;

    const visibleCards = [];
    const hiddenCards = [];

    cards.forEach(card => {
      const category = card.getAttribute('data-category');
      const isMatch = filter === 'all' || category === filter;
      if (isMatch) visibleCards.push(card);
      else hiddenCards.push(card);
    });

    // Phase 1: Fade out hidden cards
    const outTl = gsap.timeline({
      onComplete: () => {
        // Hide outgoing cards
        hiddenCards.forEach(card => {
          card.style.display = 'none';
          card.style.opacity = '';
          card.style.transform = '';
        });

        // Show and animate in visible cards
        visibleCards.forEach(card => {
          card.style.display = '';
        });

        // Phase 2: Fade in matching cards
        if (visibleCards.length) {
          gsap.fromTo(visibleCards,
            { opacity: 0, y: 30, scale: 0.95 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.5,
              stagger: 0.07,
              ease: 'power2.out',
              onComplete: () => { isAnimating = false; }
            }
          );
        } else {
          isAnimating = false;
        }
      }
    });

    if (hiddenCards.length) {
      outTl.to(hiddenCards, {
        opacity: 0,
        y: -20,
        scale: 0.95,
        duration: 0.3,
        stagger: 0.04,
        ease: 'power2.in',
      });
    } else {
      // No cards to hide, go straight to reveal
      isAnimating = false;
      visibleCards.forEach(card => { card.style.display = ''; });
      gsap.fromTo(visibleCards,
        { opacity: 0, y: 30, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          stagger: 0.07,
          ease: 'power2.out',
        }
      );
    }
  }

  // ── Init ──
  // Ensure all cards visible on load
  cards.forEach(card => {
    card.style.display = '';
  });

})();
