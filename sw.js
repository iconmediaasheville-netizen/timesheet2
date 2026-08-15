const CACHE_NAME = 'timesheet-v1';
const ASSETS = [
  './',
  './index.html'
];

// Install Service Worker and Cache App Files
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
  self.skipWaiting();
});

// Serve Cached Files When Offline
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(e.request).catch(() => {
        return caches.match('./index.html');
      });
    })
  );
});
