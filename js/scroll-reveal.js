document.addEventListener('DOMContentLoaded', () => {
  // IntersectionObserver for scroll-reveal animations
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Add active class to animate it into view
        entry.target.classList.add('active');
        // Unobserve to trigger once per element only
        observer.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    rootMargin: '0px 0px -10% 0px', // trigger when 10% into viewport
    threshold: 0.1
  });

  revealElements.forEach(el => {
    revealObserver.observe(el);
  });
});
