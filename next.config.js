// next.config.js
const withPlugins = require('next-compose-plugins');
const optimizedImages = require('next-optimized-images');

/**
 * Asset prefix must be set to the build dir from
 * WordPress' webroot if not deploying to a CDN.
 */
const assetPrefix = `/app/themes/sage-next/out/`

/**
 * App config
 */
const app = {
  host: 'http://kellymears.vagrant',
  endpoint: 'wp/graphql',
  version: '1.0.0',
}

/**
 * Next config
 */
module.exports = withPlugins([
  [optimizedImages, {
    optimizeImagesInDev: true,
  }],
], {
  assetPrefix,
  compress: true,
  distDir: `/dist`,
  env: {
    graphQLEndpoint: `${app.host}/${app.endpoint}`,
    url: app.host,
    reqMode: 'no-cors',
  },
  poweredByHeader: false,
})
