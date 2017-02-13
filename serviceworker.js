
var APP_PREFIX = 'offline-v';
var VERSION = '1.0.4';
var CACHE_NAME = APP_PREFIX + VERSION
var files = ['/',
             '/index.html',
             '/scripts/main.js',
             '/scripts/app.js',
             '/scripts/services/color.service.js',
             '/scripts/models/color.model.js',
             '/scripts/contexts/dexie.context.js',
             '/vendors/require.js',
             '/vendors/dexie.min.js',
             '/content/images/logo.png',
             '/content/images/icon.png',
             '/content/images/ColorBucket.ico',
             '/content/styles/style.css'];

self.addEventListener('fetch', function (e) {
  e.respondWith(
    caches.match(e.request).then(function (request) {
      if (request) {
        return request
      } else {
        return fetch(e.request)
      }
    })
  )
})

self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      console.log('installing cache : ' + CACHE_NAME)
      return cache.addAll(files)
    })
  )
})

self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys().then(function (keyList) {
      var cacheWhitelist = keyList.filter(function (key) {
        return key.indexOf(APP_PREFIX)
      })

      cacheWhitelist.push(CACHE_NAME)

      return Promise.all(keyList.map(function (key, i) {
        if (cacheWhitelist.indexOf(key) === -1) {
          console.log('deleting cache : ' + keyList[i] )
          return caches.delete(keyList[i])
        } else {
          return Promise.resolve();
        }
      }))
    })
  )
})
