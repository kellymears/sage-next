/**
 * Next config
 */
const withPlugins = require('next-compose-plugins');
const optimizedImages = require('next-optimized-images');

/**
 * Next config
 */
module.exports = withPlugins([
  [optimizedImages, { optimizeImagesInDev: true }],
], {
  compress: true,
  distDir: `/dist`,
  env: {
    reqMode: 'no-cors',
    version: '1.0.0',
    graphQLEndpoint: `${process.env.URL}/wp/graphql`,
    url: process.env.URL,
  },
  poweredByHeader: false,
})
