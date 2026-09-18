// Service worker per AI-901 Exam Simulator (versione web).
// Cache "stale-while-revalidate": risponde subito dalla cache se disponibile (offline-safe),
// e in background aggiorna la cache dalla rete quando possibile. Funziona solo se la pagina è
// servita via http/https (es. GitHub Pages): il browser non registra service worker per pagine
// aperte come file locale (file://), dove però l'offline funziona comunque perché il file è già
// interamente sul dispositivo.

const CACHE_NAME = 'ai901-quiz-v10';
const ASSETS = [
  './AI901-Quiz-Web.html',
  './exam-config.js',
  './exam-questions.js',
  './manifest.webmanifest',
  './icon-192.png',
  './icon-512.png',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  // La Cache API accetta solo richieste http/https: alcune estensioni del browser (es. gestori
  // di password, ad-blocker) fanno fetch di risorse con schema "chrome-extension://" (o simili)
  // dentro il contesto della pagina, che il service worker intercetta comunque essendo nel suo
  // scope. cache.put() su una di queste richieste lancia un TypeError non gestito ("Request
  // scheme ... is unsupported"): queste richieste vanno semplicemente ignorate (passate alla
  // rete senza tentare di metterle in cache), non riguardano mai i file di questa app.
  if (!/^https?:$/.test(new URL(event.request.url).protocol)) return;

  event.respondWith(
    caches.match(event.request).then((cached) => {
      const networkFetch = fetch(event.request)
        .then((response) => {
          if (response && response.ok) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
          }
          return response;
        })
        .catch(() => cached);

      return cached || networkFetch;
    })
  );
});
