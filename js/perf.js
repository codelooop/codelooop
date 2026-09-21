/* ============================================================
   CodeLoop — perf.js
   - Service Worker registration
   - Native lazy-loading polyfill for older browsers
   - requestIdleCallback shim
   ============================================================ */

(function () {
  'use strict';

  // ── 1. Service Worker Registration
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
      navigator.serviceWorker
        .register('/sw.js', { scope: '/' })
        .then(function (reg) {
          // Check for updates every 60 seconds
          setInterval(function () { reg.update(); }, 60000);
        })
        .catch(function () {
          // SW not supported in this context (e.g., file:// protocol) — silent fail
        });
    });
  }

  // ── 2. requestIdleCallback shim (Safari < 17 lacks it)
  window.requestIdleCallback =
    window.requestIdleCallback ||
    function (cb) {
      var start = Date.now();
      return setTimeout(function () {
        cb({
          didTimeout: false,
          timeRemaining: function () {
            return Math.max(0, 50 - (Date.now() - start));
          },
        });
      }, 1);
    };

  window.cancelIdleCallback =
    window.cancelIdleCallback ||
    function (id) {
      clearTimeout(id);
    };

  // ── 3. Native lazy-load: add loading="lazy" to all below-fold images
  //    that don't already have it (runs once DOM is ready)
  document.addEventListener('DOMContentLoaded', function () {
    // Hero images are above-fold — skip them
    var eagerSelectors = [
      '.hero__bg-infinity',
      '.preloader__logo',
      '.navbar__logo img',
      '.logo-image',
    ];

    var allImgs = document.querySelectorAll('img');
    allImgs.forEach(function (img) {
      var isEager = eagerSelectors.some(function (sel) {
        return img.matches(sel) || img.closest(sel);
      });
      if (!isEager && !img.hasAttribute('loading')) {
        img.setAttribute('loading', 'lazy');
        img.setAttribute('decoding', 'async');
      }
    });

    // ── 4. content-visibility: auto on off-screen sections
    //    Browsers that support it skip painting/layout until near viewport
    var offScreenSections = document.querySelectorAll(
      '#services, #portfolio, #process, #about, #contact, footer'
    );
    offScreenSections.forEach(function (el) {
      // Only set if browser supports content-visibility
      if ('contentVisibility' in document.documentElement.style ||
          CSS.supports('content-visibility', 'auto')) {
        el.style.contentVisibility = 'auto';
        // contain-intrinsic-size prevents layout shift while hidden
        el.style.containIntrinsicSize = '0 600px';
      }
    });
  });
})();
