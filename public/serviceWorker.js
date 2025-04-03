const ON_URL = '/index.html'

// eslint-disable-next-line no-restricted-globals
self.addEventListener("install", (event) => { 
    event.waitUntil(
      caches
        .open("React App")
        .then((cache) =>
          cache.addAll([
            "/",
            "bundle.js",
            "/index.html",
            "/main.css",
            "/index.css",
            "/car.png",
          ]),
        ),
    );
});

// eslint-disable-next-line no-restricted-globals
self.addEventListener("fetch", (event) => {
    if (event.request.mode === 'navigate') {
      event.respondWith(
        fetch(event.request).then(response => {
            return response || fetch(event.request)
        })
        .catch(() => caches.match(ON_URL))
      )
    } else {
      event.respondWith(caches.match(event.request)
      .then((response) => {
        if (response) {
          return response
        }
        return fetch(event.request)
      }));
    }
});

// eslint-disable-next-line no-restricted-globals
self.addEventListener("activate", (event) => {
    const cacheAllowlist = ["React App"];
  
    event.waitUntil(
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.filter((cacheName) => cacheName !== cacheAllowlist)
          .map((cacheName) => caches.delete(cacheName)),
        );
      }),
    );
});  