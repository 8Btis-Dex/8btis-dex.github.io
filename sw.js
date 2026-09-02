// Service Worker de 8 Bits - Buscador Pokémon
// Cachea los archivos base de la app para que abra rápido y funcione
// aunque no haya conexión (los datos de Firestore igual necesitan internet).

// Subí este número cada vez que publiques cambios importantes: al cambiar
// el contenido de este archivo, el navegador detecta que el service worker
// cambió y fuerza la actualización (borra la caché vieja, guarda la nueva),
// incluso en celulares que se habían quedado con una versión anterior.
const CACHE_NAME = '8bits-pokemon-v2';
const APP_SHELL = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

// Estrategia: red primero, y si falla (sin internet), usa el caché.
self.addEventListener('fetch', (event) => {
  // No interceptamos llamadas a Firestore/Firebase; que vayan directo a la red.
  if (event.request.url.includes('firestore') || event.request.url.includes('googleapis')) {
    return;
  }

  event.respondWith(
    // "no-store" evita que el navegador resuelva esto con su caché HTTP
    // normal (que es lo que estaba dejando ver una versión vieja en el
    // celular aunque la app pidiera "red primero"): así se obliga a pedirle
    // siempre el archivo real y actual al servidor.
    fetch(event.request, { cache: 'no-store' })
      .then((response) => {
        const responseClone = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, responseClone));
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});
