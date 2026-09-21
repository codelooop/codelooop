(function () {
  var preloader = document.getElementById('preloader');
  if (!preloader) return;

  // Respect prefers-reduced-motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    window.addEventListener('load', function () {
      preloader.classList.add('preloader--hidden');
      setTimeout(function() { preloader.style.display = 'none'; }, 600);
      document.body.style.overflow = '';
    });
    return;
  }

  document.body.style.overflow = 'hidden';

  var percEl = document.getElementById('preloader-percentage');
  var barEl  = document.getElementById('preloader-bar');

  var progress  = 0;
  var target    = 0;
  var loaded    = false;
  var startTime = performance.now();
  var MIN_MS    = 2000;

  window.addEventListener('load', function () { loaded = true; });

  function tick(now) {
    var elapsed = now - startTime;
    var fraction = Math.min(elapsed / MIN_MS, 1);

    if (loaded && elapsed >= MIN_MS) {
      target = 100;
    } else {
      // Ease out target
      target = Math.min(88, (1 - Math.pow(1 - fraction, 3)) * 92);
    }

    progress += (target - progress) * 0.07;
    var display = Math.floor(progress);
    
    if (percEl) percEl.textContent = display + '%';
    if (barEl)  barEl.style.width  = display + '%';

    if (progress >= 99.5) {
      if (percEl) percEl.textContent = '100%';
      if (barEl)  barEl.style.width  = '100%';
      
      setTimeout(function () {
        preloader.classList.add('preloader--hidden');
        setTimeout(function () { 
          preloader.style.display = 'none'; // removing from view once done
          document.body.style.overflow = ''; 
        }, 600);
      }, 200);
      return;
    }
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
})();
