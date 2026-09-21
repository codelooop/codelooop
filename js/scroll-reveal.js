// ============================================================
//  CodeLoop — Scroll Reveal + Hero Word Rotator
//  Vanilla JS — no external libraries
// ============================================================

// ── 1. IntersectionObserver Scroll Reveal ─────────────────
document.addEventListener('DOMContentLoaded', function () {
  var revealEls = document.querySelectorAll('.reveal');

  if (!revealEls.length) return;

  var observer = new IntersectionObserver(function (entries, obs) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        obs.unobserve(entry.target); // trigger once only
      }
    });
  }, {
    root: null,
    rootMargin: '0px 0px -8% 0px',
    threshold: 0.12
  });

  revealEls.forEach(function (el) {
    observer.observe(el);
  });

  // ── 2. Hero Rotating Word Cycler ──────────────────────────
  var wordEl   = document.getElementById('hero-rotating-word');
  var words    = ['fast', 'scalable', 'conversion-ready', 'future-proof'];
  var current  = 0;
  var interval = 2200; // ms per word

  if (!wordEl) return;

  // Set initial active state
  wordEl.classList.add('active');

  function cycleWord() {
    var next = (current + 1) % words.length;

    // Exit current word (slide up + fade)
    wordEl.classList.remove('active');
    wordEl.classList.add('exit');

    setTimeout(function () {
      // Swap text and enter from below
      wordEl.textContent = words[next];
      wordEl.classList.remove('exit');
      wordEl.classList.add('enter');

      // Force reflow so transition fires
      void wordEl.offsetWidth;

      wordEl.classList.remove('enter');
      wordEl.classList.add('active');

      current = next;
    }, 360); // matches CSS transition duration
  }

  setInterval(cycleWord, interval);

  // ── 3. Animated Stat Counters ──────────────────────────────
  var statEls = document.querySelectorAll('.stats-section__number[data-count]');
  var hasRunCounters = false;

  var statsObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting && !hasRunCounters) {
        hasRunCounters = true;
        
        statEls.forEach(function(el) {
          if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
          
          var target = parseInt(el.getAttribute('data-count'), 10);
          if (isNaN(target)) return;
          
          var suffix = el.getAttribute('data-suffix') || '';
          var duration = 1500;
          var start = null;
          
          function updateCounter(now) {
            if (!start) start = now;
            var elapsed = now - start;
            var fraction = Math.min(elapsed / duration, 1);
            
            // ease-out cubic
            var easeOut = 1 - Math.pow(1 - fraction, 3);
            var current = Math.floor(easeOut * target);
            
            el.textContent = current + suffix;
            
            if (fraction < 1) {
              requestAnimationFrame(updateCounter);
            } else {
              el.textContent = target + suffix;
            }
          }
          requestAnimationFrame(updateCounter);
        });
      }
    });
  }, { threshold: 0.5 });

  if (document.querySelector('.stats-section')) {
    statsObserver.observe(document.querySelector('.stats-section'));
  }


});
