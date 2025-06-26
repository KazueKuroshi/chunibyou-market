const CACHE_NAME = 'chunibyou-market-v1';
const FILES_TO_CACHE = [
  '/',
  '/index.html',
  '/style.css',
  '/script.js',
  '/firebaseConfig.js',
  '/favicon.svg',
  '/manifest.json',
  '/splash.html',
  '/404.html',
  '/login.html',
  '/register.html',
  '/dashboard.html',
  '/adminPanel.html'
];

// 🗂️ Instalasi Service Worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(FILES_TO_CACHE))
  );
  self.skipWaiting();
});

// 🔁 Aktivasi dan Bersihkan Cache Lama
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keyList =>
      Promise.all(
        keyList.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      )
    )
  );
  self.clients.claim();
});

// 📥 Fetch dari Cache lalu Jaringan
self.addEventListener('fetch', event => {
  if (event.request.mode !== 'navigate') return;

  event.respondWith(
    fetch(event.request).catch(() =>
      caches.match(event.request).then(response =>
        response || caches.match('/404.html')
      )
    )
  );
});
