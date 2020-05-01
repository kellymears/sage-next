/**
 * Next plugins.
 */
const withPlugins = require('next-compose-plugins')
const withOffline = require('next-offline')
const withPino = require('next-pino')
const withOptimizedImages = require('next-optimized-images')

/**
 * Next config.
 */
module.exports = withPlugins(
  [withPino, withOffline, [withOptimizedImages, {optimizeImagesInDev: true}]],
  {
    compress: true,
    distDir: 'dist',
    env: {
      version: '1.0.0',
      reqMode: 'no-cors',
      graphQLEndpoint: `${process.env.URL}/wp/graphql`,
      url: process.env.URL,
    },
    webpack: config => {
      return config
    },
    poweredByHeader: false,
  },
)
