importScripts('//storage.googleapis.com/workbox-cdn/releases/3.2.0/workbox-sw.js');


workbox.skipWaiting();
workbox.clientsClaim();

if (workbox) {
  console.log(`Yay! Workbox is loaded 🎉`);
} else {
  console.log(`Boo! Workbox didn't load 😬`);
}

workbox.routing.registerRoute(
  /\.(?:js|css|html)$/,
  // Use cache but update in the background ASAP
  new workbox.strategies.StaleWhileRevalidate({
    // Use a custom cache name
    cacheName: 'static-resources',
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 1000,
        maxAgeSeconds: 1800
      })
    ]
  })
);

workbox.routing.registerRoute(
  // Cache image files.
  /\.(?:png|jpg|jpeg|svg|gif)$/,
  // Use the cache if it's available.
  new workbox.strategies.CacheFirst({
    cacheName: 'images-cache',
    plugins: [
      new workbox.expiration.Plugin({
        // Cache only 500 images.
        maxEntries: 500,
        maxAgeSeconds: 31536000,
      })
    ],
  })
);

workbox.routing.registerRoute(
  new RegExp('/fonts/(.*)'),
  new workbox.strategies.CacheFirst({
    cacheName: 'fonts-cache',
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 30
      })
    ],
  })
);

self.addEventListener('push', function (e) {
  var options = {
    body: 'This notification was generated from a push!',
    icon: 'images/icon/icon.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: '2'
    },
    actions: [
      {
        action: 'explore', title: 'Explore this new world',
        icon: 'images/icon/icon.png'
      },
      {
        action: 'close', title: 'Close',
        icon: 'images/icon/icon.png'
      },
    ]
  };
  e.waitUntil(
    self.registration.showNotification('Hello world!', options)
  );
});


// const cacheName = 'static';
// const cacheData = [
//   './',
//   './index.html',
//   './test.html',
//   './index.js',
//   './css/style.css',
//   './images',
//   './fonts',
// ];

// self.addEventListener('install', (e) => {
//   console.log('Service Worker: Installed');
//
//   e.waitUntil(
//     caches
//       .open(cacheName)
//       .then( cache => {
//         console.log('Service Worker: Caching Files');
//         cache.addAll(cacheData);
//       })
//       .then(() => self.skipWaiting())
//   )
// });
//
// self.addEventListener('activate', (e) => {
//   console.log('Service Worker: Activate');
//
//   e.waitUntil(
//     caches.keys().then(cacheNames => {
//       return Promise.all(
//         cacheNames.map( cache => {
//           if (cache !== cacheName) {
//             console.log('Service Worker Cleaning Old Cache');
//             return caches.delete(cache);
//           }
//         })
//       )
//     })
//   )
// });

// self.addEventListener('fetch', (e) => {
//   console.log('Service Worker: Fetching');
//
//   e.respondWith(
//     caches.match(e.request).then(response => {
//       return response || fetch(e.request).then(fetchResponse => {
//         let responseClone = fetchResponse.clone();
//         caches.open(cacheName).then(cache => {
//           cache.put(e.request, responseClone)
//         });
//         return fetchResponse;
//       })
//     }).catch(() => {
//       return caches.match('./images/logo.png');
//     })
//   )
// });

// self.addEventListener('fetch', (e) => {
//   console.log('Service Worker: Fetching');
//   e.respondWith(
//     fetch(e.request).catch(() => caches.match(e.request))
//   )
// });