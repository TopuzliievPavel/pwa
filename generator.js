const workbox = require('workbox-build');

workbox.generateSW({
  cacheId: 'SSA Group',
  globDirectory: './',
  globPatterns: [
    '**/*.{css, js}'
  ],
  swDest: './service-worker.js',
  globIgnores: [
    'generator.js',
    '**/service-worker.js',
    'node_modules/**/*'
  ],
  runtimeCaching: [
    {
      urlPattern: /\.(?:html|htm|xml)$/,
      handler: 'staleWhileRevalidate',
      options: {
        cacheName: 'html',
        expiration: {
          maxAgeSeconds: 1800
        }
      }
    }
  ]
});