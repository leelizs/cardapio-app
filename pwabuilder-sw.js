// This is the "Offline page" service worker
importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');

const CACHE = "pwabuilder-page";

// TODO: replace the following with the correct offline fallback page i.e.: const offlineFallbackPage = "offline.html";
const offlineFallbackPage = "offline.html";

self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

// Cache a página offline durante a instalação
self.addEventListener('install', async (event) => {
  event.waitUntil(
    caches.open(CACHE)
      .then((cache) => cache.add(offlineFallbackPage))
  );
  self.skipWaiting(); // Faz o Service Worker ativar imediatamente após instalar
});

if (workbox.navigationPreload.isSupported()) {
  workbox.navigationPreload.enable();
}

// Verifica se a requisição é de navegação e responde com a página offline em caso de falha
self.addEventListener('fetch', (event) => {
  if (event.request.mode === 'navigate') {
    event.respondWith((async () => {
      try {
        const preloadResp = await event.preloadResponse;

        if (preloadResp) {
          return preloadResp;
        }

        const networkResp = await fetch(event.request);
        return networkResp;
      } catch (error) {

        const cache = await caches.open(CACHE);
        const cachedResp = await cache.match(offlineFallbackPage);
        return cachedResp;
      }
    })());
  }
});

// Verifica novas atualizações e notifica o cliente
self.addEventListener('updatefound', () => {
  const installingWorker = self.registration.installing;
  installingWorker.onstatechange = () => {
    if (installingWorker.state === 'installed' && self.clients) {
      // Se o novo Service Worker foi instalado, mas ainda não está controlando a página
      if (self.registration.active) {
        // Enviar uma mensagem para o cliente avisando sobre a atualização
        self.clients.matchAll({ includeUncontrolled: true }).then(clients => {
          clients.forEach(client => {
            client.postMessage({
              type: 'NEW_VERSION_AVAILABLE'
            });
          });
        });
      }
    }
  };
});
