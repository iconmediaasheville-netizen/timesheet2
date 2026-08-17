const CACHE_NAME = 'shiftlog-v2';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json'
];
// Install: Cache essential files
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS_TO_CACHE))
  );
  self.skipWaiting();
});
// Activate: Take control immediately & clean old caches
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) return caches.delete(key);
        })
      )
    )
  );
  return self.clients.claim();
});
// Fetch: Try network first, fall back to cache if offline
self.addEventListener('fetch', (e) => {
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request) || caches.match('./index.html'))
  );
});
