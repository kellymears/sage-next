/**
 * Next config
 */
const withPlugins = require('next-compose-plugins');
const optimizedImages = require('next-optimized-images');

/**
 * Next config
 */
module.exports = withPlugins([[optimizedImages, {
  optimizeImagesInDev: true,
}]], {
  // assetPrefix: '/app/themes/sage-next/out/',
  compress: true,
  distDir: `/dist`,
  env: {
    reqMode: 'no-cors',
    version: '1.0.0',
    graphQLEndpoint: 'http://kellymears.vagrant/wp/graphql',
    url: 'http://kellymears.vagrant',
  },
  poweredByHeader: false,
})
