// // Service Worker for caching and offline functionality
// const CACHE_NAME = 'portfolio-cache-v2';
// const CACHE_URLS = [
//   '/',
//   '/index.html',
//   '/styles.css',
//   '/script.js',
//   '/favicon.png',
//   '/profile.jpg',
//   '/glooko-logo.jpg',
//   '/malwarebytes-logo.jpg',
//   '/ucsd-logo.png',
//   '/ucsc-logo.png'
// ];

// // External resources with proper configuration
// const EXTERNAL_RESOURCES = [
//   'https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;700&display=swap',
//   'https://unpkg.com/aos@next/dist/aos.js',
//   'https://unpkg.com/aos@next/dist/aos.css',
//   'https://cdn.jsdelivr.net/gh/mcstudios/glightbox/dist/js/glightbox.min.js',
//   'https://cdn.jsdelivr.net/npm/glightbox/dist/css/glightbox.min.css'
// ];

// // Install event - cache core resources
// self.addEventListener('install', (event) => {
//   event.waitUntil(
//     caches.open(CACHE_NAME)
//       .then((cache) => {
//         console.log('Caching core resources');
//         return Promise.all([
//           cache.addAll(CACHE_URLS),
//           // Optional: Conditionally cache external resources
//           cacheExternalResources(cache)
//         ]);
//       })
//       .then(() => self.skipWaiting())
//       .catch((error) => {
//         console.error('Cache installation error:', error);
//       })
//   );
// });

// // Helper function to cache external resources with error handling
// const cacheExternalResources = async (cache) => {
//   for (const url of EXTERNAL_RESOURCES) {
//     try {
//       const response = await fetch(url);
//       if (response.ok) {
//         await cache.put(url, response);
//       }
//     } catch (error) {
//       console.warn(`Failed to cache external resource: ${url}`, error);
//     }
//   }
// };

// // Activate event - clean up old caches
// self.addEventListener('activate', (event) => {
//   event.waitUntil(
//     caches.keys().then((cacheNames) => {
//       return Promise.all(
//         cacheNames.map((cacheName) => {
//           if (cacheName !== CACHE_NAME) {
//             return caches.delete(cacheName);
//           }
//         })
//       );
//     }).then(() => self.clients.claim())
//   );
// });

// // Fetch event - more robust caching strategy
// self.addEventListener('fetch', (event) => {
//   // Skip cross-origin requests and non-GET requests
//   if (!event.request.url.startsWith(self.location.origin) || 
//       event.request.method !== 'GET') {
//     return;
//   }

//   event.respondWith(
//     caches.match(event.request)
//       .then((cachedResponse) => {
//         // Return cached response if available
//         if (cachedResponse) {
//           return cachedResponse;
//         }

//         // Network-first strategy for other requests
//         return fetch(event.request)
//           .then((networkResponse) => {
//             // Check if we received a valid response
//             if (!networkResponse || networkResponse.status !== 200 || 
//                 networkResponse.type !== 'basic') {
//               return networkResponse;
//             }

//             // Clone response for caching
//             const responseToCache = networkResponse.clone();
            
//             // Cache the fetched resource
//             caches.open(CACHE_NAME)
//               .then((cache) => {
//                 // Avoid caching large or dynamic resources
//                 if (!isUncacheableResource(event.request.url)) {
//                   cache.put(event.request, responseToCache);
//                 }
//               });

//             return networkResponse;
//           })
//           .catch(() => {
//             // Fallback for offline scenarios
//             return handleOfflineFallback(event.request);
//           });
//       })
//   );
// });

// // Determine if a resource should not be cached
// const isUncacheableResource = (url) => {
//   const uncacheablePatterns = [
//     '/api/',
//     'analytics',
//     'google-analytics',
//     'hot-update',
//     '.map'
//   ];
  
//   return uncacheablePatterns.some(pattern => url.includes(pattern));
// };

// // Handle offline fallback
// const handleOfflineFallback = (request) => {
//   // Fallback for different types of requests
//   if (request.destination === 'document') {
//     return caches.match('/index.html');
//   }
  
//   if (request.destination === 'image') {
//     return new Response(
//       '<svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">' +
//       '<rect width="400" height="300" fill="#eee" />' +
//       '<text x="50%" y="50%" font-family="sans-serif" font-size="24" text-anchor="middle" fill="#999">Offline</text>' +
//       '</svg>',
//       { headers: { 'Content-Type': 'image/svg+xml' } }
//     );
//   }
  
//   // Default fallback
//   return new Response('Offline', { status: 200, statusText: 'Offline' });
// };