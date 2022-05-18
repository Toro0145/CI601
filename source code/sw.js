/* eslint-disable no-restricted-globals */
const cacheName = "unichat_v1";
// build up array of files to cache
const filesToCache = [
  // for cases where people just enter folder name
  "./",
  "./index.html",
  // "./favicon.ico",
  // "./src/waving-hand.png",
  // "./src.default-user.png",
  // "./src.logo.png",
  // "./src.seal.png",
  // "./src/App.css",
  // "./src/App.js",
  // "./src/index.js",
  // etc.
];

// install service worker and cache offline content
// listen to install event of service worker - all asynchronous
self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(cacheName).then((cache) => {
      return cache.addAll(filesToCache);
    })
  );
});
// take control of all fetch requests
// serve cached content where possible
self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      // returns what's in the cache if url request matches
      return response || fetch(e.request);
    })
  );
});
