const cacheName = 'cache-v1';
const recoursesToPrecache = [
    '/',
    'index.html',
    'style.css',
    'main.js'
]

self.addEventListener('install', event => {
    console.log('Service worker Install event');
    event.waitUntil(
        caches.open(cacheName)
        .then(cache => {
            return cache.addAll(recoursesToPrecache);
        })
    );
});

self.addEventListener('activate', event => {
    console.log('activate event!');
});

self.addEventListener('fetch', event => {
    event.respondWith(caches.match(event.request)
    .then(cachedResponse => {
        return cachedResponse || fetch(event.request);
    })
    );
});