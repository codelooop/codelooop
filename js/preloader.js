/* ============================================================
   CodeLoop — Preloader
   Dual-logo clip-path fill/reveal synced to a % counter.
   Pure vanilla JS, no deps.
   ============================================================ */
(function () {
  'use strict';

  var preloader  = document.getElementById('preloader');
  var logoBright = document.getElementById('preloader-logo-bright');
  var label      = document.getElementById('preloader-label');

  // If markup is missing for some reason, bail silently
  if (!preloader || !logoBright || !label) return;

  // ── Reduced-motion: skip straight to revealed logo, then fade out
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    logoBright.style.clipPath = 'inset(0 0% 0 0)';
    label.textContent = 'loading\u2026\u00a0100%';
    preloader.setAttribute('aria-valuenow', '100');
    window.addEventListener('load', function () {
      setTimeout(function () {
        preloader.classList.add('preloader--hidden');
        setTimeout(function () {
          preloader.style.display = 'none';
          document.body.style.overflow = '';
          revealHero();
        }, 350);
      }, 80);
    });
    return;
  }

  // ── Lock scroll while preloader is active
  document.body.style.overflow = 'hidden';

  // ── Animation config
  var DURATION  = 2200; // ms — full 0→100 sweep
  var startTime = null;
  var rafId     = null;

  // Cubic ease-out: fast at the start, decelerates into 100
  function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
  }

  function animate(now) {
    if (!startTime) startTime = now;

    var elapsed  = now - startTime;
    var t        = Math.min(elapsed / DURATION, 1);       // 0 → 1
    var pct      = Math.floor(easeOutCubic(t) * 100);    // 0 → 100 (integer)

    // Sync clip-path: inset(0 RIGHT% 0 0)
    // RIGHT = 100 - pct → starts at 100% (hidden), ends at 0% (fully revealed)
    var right = (100 - pct).toFixed(1);
    logoBright.style.clipPath = 'inset(0 ' + right + '% 0 0)';

    // Update label text
    label.textContent = 'loading\u2026\u00a0' + pct + '%';

    // Update ARIA
    preloader.setAttribute('aria-valuenow', pct);

    if (t < 1) {
      rafId = requestAnimationFrame(animate);
    } else {
      // Snap to exactly 100%
      logoBright.style.clipPath = 'inset(0 0% 0 0)';
      label.textContent = 'loading\u2026\u00a0100%';
      preloader.setAttribute('aria-valuenow', '100');

      // Hold 150ms at 100, then slide/fade away
      setTimeout(dismiss, 150);
    }
  }

  function dismiss() {
    preloader.classList.add('preloader--hidden');

    // After the CSS transition finishes (0.75s), clean up
    setTimeout(function () {
      preloader.style.display = 'none';
      document.body.style.overflow = '';
      revealHero();
    }, 800);
  }

  // ── Start animation as soon as script runs (elements already in DOM)
  rafId = requestAnimationFrame(animate);

  // ── Hero reveal: stagger-in elements that carry .hero-reveal
  function revealHero() {
    var els = document.querySelectorAll('.hero-reveal');
    els.forEach(function (el, i) {
      setTimeout(function () {
        el.classList.add('visible');
      }, i * 120);
    });
  }

  // Safety: if the window unloads somehow, cancel rAF
  window.addEventListener('pagehide', function () {
    if (rafId) cancelAnimationFrame(rafId);
  });
})();
