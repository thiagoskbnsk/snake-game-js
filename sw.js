const filesToCache = [
  '/',
  '/index.html',
  '/css/main.css',
  '/js/main.js',
  '/js/game.js',
  '/js/food.js',
  '/js/snake.js',
  '/sw.js',
  '/icon.ico',
  '/manifest.json'
];

/* Start the service worker and cache all of the app's content */
self.addEventListener('install', function(e) {
  console.log('install')
});

/* Serve cached content when offline */
self.addEventListener('fetch', function(e) {
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});