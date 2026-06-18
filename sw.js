const CACHE_NAME = 'logo-suki-cache-v12';
const urlsToCache = [
    './',
    './index.html',
    './manifest.json',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
    'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js',
    './192x192.png',
    './512x512.png',
    './Fighting Spirit 2.otf',
    './Kill The Noise.otf',
    './Martyric_PersonalUse.ttf',
    './Road_Rage.otf',
    './logo1.png', './logo2.png', './logo3.png', './logo4.png', './logo5.png',
    './logo6.png', './logo7.png', './logo8.png', './logo9.png', './logo10.png',
    './logo11.png', './logo12.png', './logo13.png', './logo14.png', './logo15.png',
    './logo16.png', './logo17.jpg', './logo18.png'
];

self.addEventListener('install', event => {
    self.skipWaiting();
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => self.clients.claim())
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            
            return response || fetch(event.request);
        })
    );
});
