const CACHE_NAME = 'salud-app-v2'; // Cambia 'v2' cada vez que actualices la app
const urlsToCache = [
  '/', // La raíz de tu app
  'index.html',
  'manifest.json',
  'service-worker.js',
  'icon-192x192.png',
  'icon-512x512.png',
  'https://cdn.tailwindcss.com',
  'https://unpkg.com/xlsx@0.18.5/dist/xlsx.full.min.js',
  'https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js',
  'https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js',
  'https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js'
];

// Al instalar el service worker, guarda todos los archivos en caché
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Cacheando archivos para uso offline...');
        return cache.addAll(urlsToCache);
      })
  );
});

// Cuando el teléfono intenta cargar un archivo, lo busca primero en la caché
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});