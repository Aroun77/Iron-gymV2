// Service Worker for Iron Gym
// Cache static assets and images for offline support

const CACHE_NAME = 'iron-gym-v1';
const STATIC_CACHE = 'iron-gym-static-v1';
const IMAGE_CACHE = 'iron-gym-images-v1';

// Assets to cache immediately on install
const STATIC_ASSETS = [
    '/',
    '/index.html',
    '/src/main.jsx',
    '/src/index.css'
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
    console.log('[SW] Installing service worker...');
    event.waitUntil(
        caches.open(STATIC_CACHE)
            .then((cache) => {
                console.log('[SW] Caching static assets');
                return cache.addAll(STATIC_ASSETS);
            })
            .then(() => self.skipWaiting())
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
    console.log('[SW] Activating service worker...');
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== STATIC_CACHE && cacheName !== IMAGE_CACHE) {
                        console.log('[SW] Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => self.clients.claim())
    );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
    const { request } = event;
    const url = new URL(request.url);

    // Strategy 1: Cache-first for images (Imgix)
    if (url.hostname.includes('imgix.net')) {
        event.respondWith(
            caches.open(IMAGE_CACHE).then((cache) => {
                return cache.match(request).then((cachedResponse) => {
                    if (cachedResponse) {
                        console.log('[SW] Serving image from cache:', request.url);
                        return cachedResponse;
                    }

                    return fetch(request).then((networkResponse) => {
                        // Only cache successful responses
                        if (networkResponse && networkResponse.status === 200) {
                            cache.put(request, networkResponse.clone());
                        }
                        return networkResponse;
                    });
                });
            })
        );
        return;
    }

    // Strategy 2: Network-first for API calls
    if (url.hostname.includes('onrender.com') || url.pathname.startsWith('/api')) {
        event.respondWith(
            fetch(request)
                .then((response) => {
                    // Clone and cache successful API responses
                    if (response && response.status === 200) {
                        const responseClone = response.clone();
                        caches.open(CACHE_NAME).then((cache) => {
                            cache.put(request, responseClone);
                        });
                    }
                    return response;
                })
                .catch(() => {
                    // Fallback to cache if network fails
                    return caches.match(request);
                })
        );
        return;
    }

    // Strategy 3: Cache-first for static assets
    event.respondWith(
        caches.match(request).then((cachedResponse) => {
            if (cachedResponse) {
                return cachedResponse;
            }

            return fetch(request).then((response) => {
                if (!response || response.status !== 200 || response.type === 'error') {
                    return response;
                }

                const responseClone = response.clone();
                caches.open(STATIC_CACHE).then((cache) => {
                    cache.put(request, responseClone);
                });

                return response;
            });
        })
    );
});
