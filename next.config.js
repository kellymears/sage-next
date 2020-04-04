// next.config.js
const withPlugins = require('next-compose-plugins');
const optimizedImages = require('next-optimized-images');

const config = {
  host: 'http://tinypixel.vagrant',
}

const nextConfig = {
  compress: true,
  env: {
    graphQLEndpoint: `${config.host}/wp/graphql`,
    reqMode: 'no-cors',
  },
  exportPathMap: () => ({
    '/': { page: '/' },
  }),
}

module.exports = withPlugins([
  [optimizedImages, {
    optimizeImagesInDev: true,
  }],
], nextConfig)
