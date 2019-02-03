(global => {
  'use strict';
  importScripts('/node_modules/sw-toolbox/sw-toolbox.js')

  // Turn on debug logging, visible in the Developer Tools' console.
  global.toolbox.options.debug = true;

  // Set up a handler for HTTP GET requests:
  // - /\.ytimg\.com\// will match any requests whose URL contains 'ytimg.com'.
  //   A narrower RegExp could be used, but just checking for ytimg.com anywhere
  //   in the URL should be fine for this sample.
  // - toolbox.cacheFirst let us to use the predefined cache strategy for those
  //   requests.

  global.toolbox.router.get('http://localhost:3000/', global.toolbox.cacheFirst, {
    // Use a dedicated cache for the responses, separate from the default cache.
    cache: {
      name: 'olx',
      // Store up to 10 entries in that cache.
      maxEntries: 30,
      // Expire any entries that are older than 30 seconds.
      maxAgeSeconds: 60 * 60 * 24 * 365
    }
  });

  global.toolbox.precache(['/', '/index.html',
    // '/bootstrap/fontawesome/css/all.min.css',
    // '/bootstrap/css/bootstrap.min.css',

    // '/bootstrap/jquery-3.3.1.slim.min.js',
    // '/bootstrap/popper.min.js',
    // '/bootstrap/js/bootstrap.min.js',
    '/static/js/bundle.js'
  ]);
  // By default, all requests that don't match our custom handler will use the
  // toolbox.networkFirst cache strategy, and their responses will be stored in
  // the default cache.
  global.toolbox.router.default = global.toolbox.networkFirst;

  // Boilerplate to ensure our service worker takes control of the page as soon
  // as possible.
  global.addEventListener('install',
    event => event.waitUntil(global.skipWaiting()));
  global.addEventListener('activate',
    event => event.waitUntil(global.clients.claim()));
})(self);