// This is the "Offline page" service worker
importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');

// Altere a versão do cache sempre que fizer qualquer alteração no site
const CACHE = "pwabuilder-page-v1"; // Mude este valor toda vez que atualizar algo

const offlineFallbackPage = "offline.html";

// Evento de mensagem para o SKIP_WAITING
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

// Ouvinte para a instalação do Service Worker
self.addEventListener('install', async (event) => {
  event.waitUntil(
    caches.open(CACHE)
      .then((cache) => cache.add(offlineFallbackPage))
  );
  self.skipWaiting(); // Faz o Service Worker ativar imediatamente
});

// Ativação do navigation preload, se suportado
if (workbox.navigationPreload.isSupported()) {
  workbox.navigationPreload.enable();
}

// Ouvinte de fetch para servir página offline em falha de rede
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
    console.log('Estado do Service Worker:', installingWorker.state);
    if (installingWorker.state === 'installed' && self.clients) {
      if (self.registration.active) {
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


