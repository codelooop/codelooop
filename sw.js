/* ============================================================
   CodeLoop — Service Worker (sw.js)
   Cache-first for assets, network-first for HTML
   ============================================================ */

const CACHE_NAME  = 'codeloop-v1';
const CACHE_PAGES = 'codeloop-pages-v1';

// Assets to pre-cache on install (critical shell)
const PRECACHE_ASSETS = [
  '/',
  '/index.html',
  '/css/style.css',
  '/css/components.css',
  '/css/animations.css',
  '/css/responsive.css',
  '/js/main.js',
  '/js/scroll-reveal.js',
  '/js/navbar.js',
  '/js/preloader.js',
  '/assets/images/codeloop2.png',
  '/assets/images/blob.png',
];

// ── Install: pre-cache the shell
self.addEventListener('install', (event) => {
  self.skipWaiting(); // Activate immediately
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_ASSETS.map(url => new Request(url, { cache: 'reload' })));
    }).catch(() => {
      // Silently fail on install — don't block page load
    })
  );
});

// ── Activate: clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter(k => k !== CACHE_NAME && k !== CACHE_PAGES)
          .map(k => caches.delete(k))
      )
    ).then(() => self.clients.claim())
  );
});

// ── Fetch strategy
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET and cross-origin requests (except Google Fonts)
  if (request.method !== 'GET') return;
  if (url.origin !== location.origin && !url.hostname.includes('fonts.g')) return;

  // HTML pages → Network-first (always fresh content)
  if (request.destination === 'document') {
    event.respondWith(
      fetch(request)
        .then((res) => {
          const clone = res.clone();
          caches.open(CACHE_PAGES).then(c => c.put(request, clone));
          return res;
        })
        .catch(() => caches.match(request))
    );
    return;
  }

  // Google Fonts → Cache-first (immutable external assets)
  if (url.hostname.includes('fonts.g')) {
    event.respondWith(
      caches.match(request).then(cached => {
        if (cached) return cached;
        return fetch(request).then(res => {
          const clone = res.clone();
          caches.open(CACHE_NAME).then(c => c.put(request, clone));
          return res;
        });
      })
    );
    return;
  }

  // JS / CSS / Images / Fonts → Cache-first, refresh in background (stale-while-revalidate)
  if (['script', 'style', 'image', 'font'].includes(request.destination)) {
    event.respondWith(
      caches.open(CACHE_NAME).then((cache) =>
        cache.match(request).then((cached) => {
          const fetchPromise = fetch(request).then((res) => {
            cache.put(request, res.clone());
            return res;
          }).catch(() => null);

          return cached || fetchPromise;
        })
      )
    );
    return;
  }
});
