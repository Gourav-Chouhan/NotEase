const cacheName = "app-cache-v1"; // Change the cache version when updating assets

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(cacheName).then((cache) => {
      return cache.addAll([
        "/",
        "/index.html",
        "/manifest.json",
        // Add other static assets
      ]);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Try to fetch a fresh copy from the network
      const fetchPromise = fetch(event.request).then((networkResponse) => {
        if (!networkResponse || networkResponse.status !== 200) {
          return response;
        }

        caches.open(cacheName).then((cache) => {
          // Update the cache with the new response
          cache.put(event.request, networkResponse.clone());
        });

        return networkResponse;
      });

      return response || fetchPromise;
    })
  );
});
