// next.config.js
const withPlugins = require('next-compose-plugins');
const optimizedImages = require('next-optimized-images');

/**
 * App
 */
const app = {
  host: 'http://kellymears.vagrant',
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
    assetPrefix: `/app/themes/sage-next/out/`,
    compress: true,
    distDir: `/dist`,
    env: {
      graphQLEndpoint: `${app.host}/wp/graphql`,
      reqMode: 'no-cors',
    },
    poweredByHeader: false,
  })
