const CACHE_VERSION = "v2";
const CACHE_NAME = `straeva-${CACHE_VERSION}`;

const PRECACHE_URLS = [
  "/",
  "/hjem/",
  "/bevegelse/",
  "/seire/",
  "/omsorg/",
  "/refleksjon/",
  "/innsikt/",
  "/programmer/",
];

// Install: cache app shell
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_URLS).catch(() => {});
    })
  );
  self.skipWaiting();
});

// Activate: clean old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME && key.startsWith("straeva-"))
          .map((key) => caches.delete(key))
      )
    ).then(() => self.clients.claim())
  );
});

// Fetch: network-first for API, cache-first for assets
self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET and cross-origin requests
  if (request.method !== "GET" || url.origin !== self.location.origin) return;

  // Skip Next.js internals that must go to network
  if (url.pathname.startsWith("/_next/") ||
      url.pathname.startsWith("/api/") ||
      url.pathname.endsWith(".json")) {
    event.respondWith(fetch(request).catch(() => new Response("Offline", { status: 503 })));
    return;
  }

  // Cache-first for static assets and pages
  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) {
        // Stale-while-revalidate: return cached, update in background
        const fetchPromise = fetch(request).then((response) => {
          if (response.ok) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
          }
          return response;
        }).catch(() => cached);
        return cached;
      }

      // Not in cache: fetch from network
      return fetch(request).then((response) => {
        if (response.ok) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
        }
        return response;
      }).catch(() => {
        // Offline fallback for navigation requests
        if (request.mode === "navigate") {
          return caches.match("/").then((root) => root || new Response(
            "<html><body><h1>Du er offline</h1><p>Straeva krever internett for forste gangs lasting.</p></body></html>",
            { headers: { "Content-Type": "text/html" } }
          ));
        }
        return new Response("Offline", { status: 503 });
      });
    })
  );
});

// Handle push notifications (future)
self.addEventListener("push", (event) => {
  if (!event.data) return;
  const data = event.data.json();
  event.waitUntil(
    self.registration.showNotification(data.title || "Straeva", {
      body: data.body,
      icon: "/icon-192.png",
      badge: "/icon-192.png",
    })
  );
});
