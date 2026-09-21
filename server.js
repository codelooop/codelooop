'use strict';

const express    = require('express');
const compression = require('compression');
const helmet     = require('helmet');
const path       = require('path');

const app  = express();
const PORT = process.env.PORT || 3000;

// ── Security headers (but relaxed CSP so inline scripts / CDNs still work)
app.use(helmet({
  contentSecurityPolicy: false,
  crossOriginEmbedderPolicy: false,
}));

// ── Gzip / Brotli compression — biggest single win for large JS/CSS
app.use(compression({
  level: 6,          // Good balance: speed vs size
  threshold: 1024,   // Only compress responses > 1 KB
  filter: (req, res) => {
    if (req.headers['x-no-compression']) return false;
    return compression.filter(req, res);
  }
}));

// ── Cache-Control headers per asset type
app.use((req, res, next) => {
  const url = req.url;

  // HTML — no cache (always fresh)
  if (url === '/' || url.endsWith('.html')) {
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');

  // Hashed / versioned assets (css?v=50, js?v=50) — 1 year immutable
  } else if (/\.(css|js)(\?v=\d+)?$/.test(url)) {
    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');

  // Images & fonts — 30 days
  } else if (/\.(png|jpg|jpeg|gif|webp|svg|ico|woff|woff2|ttf|eot)$/.test(url)) {
    res.setHeader('Cache-Control', 'public, max-age=2592000');

  // Service worker — no cache (browser handles its own update cycle)
  } else if (url === '/sw.js') {
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Service-Worker-Allowed', '/');
  }

  next();
});

// ── Serve the whole CodeLoop folder as static root
app.use(express.static(path.join(__dirname, '.'), {
  etag: true,
  lastModified: true,
  index: 'index.html',
}));

// ── SPA fallback: any unknown route serves index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// ── Start
app.listen(PORT, () => {
  console.log(`\n  CodeLoop server running at http://localhost:${PORT}`);
  console.log('  Gzip compression: ON');
  console.log('  Cache-Control headers: ON');
  console.log('  Helmet security headers: ON\n');
});
