(function () {
  var preloader = document.getElementById('preloader');
  if (!preloader) return;

  // Reduced-motion: skip animation, reveal hero immediately
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    window.addEventListener('load', function () {
      preloader.classList.add('preloader--hidden');
      setTimeout(function () {
        preloader.style.display = 'none';
        document.body.style.overflow = '';
        revealHero();
      }, 0);
    });
    return;
  }

  // Lock scroll during preloader
  document.body.style.overflow = 'hidden';

  var percEl   = document.getElementById('preloader-percentage');
  var barEl    = document.getElementById('preloader-bar');
  var progress = 0;
  var target   = 0;
  var loaded   = false;
  var startTime = performance.now();

  // Minimum display time: 4 seconds so users see the full animation
  var MIN_MS = 4000;

  window.addEventListener('load', function () { loaded = true; });

  // Smooth ease-in-out curve — gradual start, gradual end
  function easeInOut(t) {
    return t < 0.5
      ? 4 * t * t * t
      : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  function tick(now) {
    var elapsed  = now - startTime;
    var fraction = Math.min(elapsed / MIN_MS, 1);

    if (loaded && elapsed >= MIN_MS) {
      target = 100;
    } else if (loaded) {
      // Page loaded before MIN_MS — slowly climb to 95, then hold
      target = Math.max(target, Math.min(95, easeInOut(fraction) * 100));
    } else {
      // Page still loading — ease from 0 → 85 over MIN_MS
      target = Math.min(85, easeInOut(fraction) * 90);
    }

    // Very slow lerp — 0.018 makes it feel like a real loading bar
    progress += (target - progress) * 0.018;

    var display = Math.min(99, Math.floor(progress));
    if (percEl) percEl.textContent = display + '%';
    if (barEl)  barEl.style.width  = display + '%';

    if (target >= 100 && progress >= 99.2) {
      // Snap to 100
      if (percEl) percEl.textContent = '100%';
      if (barEl)  barEl.style.width  = '100%';

      // Brief pause at 100% → wipe the preloader away
      setTimeout(function () {
        preloader.classList.add('preloader--hidden');

        // After wipe-up transition completes, clean up and reveal hero
        setTimeout(function () {
          preloader.style.display = 'none';
          document.body.style.overflow = '';
          revealHero();
        }, 800);
      }, 350);
      return;
    }

    requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);

  // ── Hero Reveal (called once preloader exits) ──────────────
  function revealHero() {
    var heroEls = document.querySelectorAll('.hero-reveal');
    heroEls.forEach(function (el, i) {
      setTimeout(function () {
        el.classList.add('visible');
      }, i * 120);
    });
  }
})();
