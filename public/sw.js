// public/sw.js
const CACHE        = 'app-cache-v1';
const ASSET_CACHE  = 'asset-cache-v1';
const OFFLINE_URLS = ['/', '/manifest.webmanifest'];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE)
      .then((cache) => cache.addAll(OFFLINE_URLS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys
        .filter((k) => ![CACHE, ASSET_CACHE].includes(k))
        .map((k) => caches.delete(k))
      )
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  const url = new URL(req.url);
  if (req.method !== 'GET') return;

  // Páginas: network-first con fallback a cache
  if (req.destination === 'document') {
    event.respondWith(
      fetch(req).then((res) => {
        const copy = res.clone();
        caches.open(CACHE).then((cache) => cache.put(req, copy));
        return res;
      }).catch(() => caches.match(req).then((res) => res || caches.match('/')))
    );
    return;
  }

  // Assets y Next static: cache-first
  const isAsset =
    ['script','style','font','image'].includes(req.destination) ||
    url.pathname.startsWith('/_next/') ||
    url.pathname.startsWith('/icons/');

  if (isAsset) {
    event.respondWith(
      caches.open(ASSET_CACHE).then((cache) =>
        cache.match(req).then((cached) =>
          cached ||
          fetch(req).then((res) => {
            cache.put(req, res.clone());
            return res;
          })
        )
      )
    );
  }
});
