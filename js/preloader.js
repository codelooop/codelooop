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
  // Minimum display time: exactly 10s as requested
  var MIN_MS   = 10000;

  window.addEventListener('load', function () { loaded = true; });

  // Cubic ease-out — snappy at start, decelerates into 100
  function easeOut(t) { return 1 - Math.pow(1 - t, 3); }

  function tick(now) {
    var elapsed  = now - startTime;
    var fraction = Math.min(elapsed / MIN_MS, 1);

    // Smooth progression to 100% over the full 10 seconds
    progress = easeOut(fraction) * 100;

    var display = Math.floor(progress);
    if (percEl) percEl.textContent = display + '%';
    if (barEl)  barEl.style.width  = display + '%';

    // Finish when the animation reaches 100% AND the page has actually loaded
    if (progress >= 99.9 && loaded) {
      // Snap to 100
      if (percEl) percEl.textContent = '100%';
      if (barEl)  barEl.style.width  = '100%';

      // Brief pause → fade+slide the preloader away
      setTimeout(function () {
        preloader.classList.add('preloader--hidden');

        // After fade completes, clean up and reveal hero
        setTimeout(function () {
          preloader.style.display = 'none';
          document.body.style.overflow = '';
          revealHero();
        }, 650);
      }, 200);
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
