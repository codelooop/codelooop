(function () {
  var preloader = document.getElementById('preloader');
  if (!preloader) return;

  // Reduced-motion: skip animation, reveal hero immediately
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    window.addEventListener('load', function () {
      dismiss();
    });
    return;
  }

  // Lock scroll during preloader
  document.body.style.overflow = 'hidden';

  var percEl    = document.getElementById('preloader-percentage');
  var barEl     = document.getElementById('preloader-bar');
  var progress  = 0;
  var loaded    = false;
  var dismissed = false;
  var startTime = performance.now();

  // Total guaranteed animation time: 10 seconds
  var MIN_MS = 10000;

  window.addEventListener('load', function () { loaded = true; });

  // Ease-in-out cubic — smooth start, smooth end
  function easeInOut(t) {
    return t < 0.5
      ? 4 * t * t * t
      : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  function tick(now) {
    if (dismissed) return;

    var elapsed  = now - startTime;
    var fraction = Math.min(elapsed / MIN_MS, 1);

    // Drive progress 0→100 over 10s using smooth ease-in-out
    progress = easeInOut(fraction) * 100;

    // Cap at 99 until page is truly loaded (prevents freeze at 100)
    if (!loaded) progress = Math.min(progress, 99);

    var display = Math.min(Math.floor(progress), 100);
    if (percEl) percEl.textContent = display + '%';
    if (barEl)  barEl.style.width  = display + '%';

    // Dismiss when animation is done AND page is loaded
    if (fraction >= 1 && loaded) {
      // Snap to 100% visually
      if (percEl) percEl.textContent = '100%';
      if (barEl)  barEl.style.width  = '100%';
      // Small pause so user sees 100%, then wipe away
      setTimeout(dismiss, 300);
      return;
    }

    requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);

  // ── Dismiss: wipe the preloader upward off screen ──
  function dismiss() {
    if (dismissed) return;
    dismissed = true;

    preloader.classList.add('preloader--hidden');

    setTimeout(function () {
      preloader.style.display = 'none';
      document.body.style.overflow = '';
      revealHero();
    }, 750); // matches CSS transition duration
  }

  // ── Hero Reveal (staggered fade-in of .hero-reveal elements) ──
  function revealHero() {
    var heroEls = document.querySelectorAll('.hero-reveal');
    heroEls.forEach(function (el, i) {
      setTimeout(function () {
        el.classList.add('visible');
      }, i * 120);
    });
  }
})();
