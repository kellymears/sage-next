// next.config.js
const withPlugins = require('next-compose-plugins');
const optimizedImages = require('next-optimized-images');
const config = {
  dev: require('./build/next.development'),
  production: require('./build/next.production'),
}

/**
 * Next config
 */
const TARGET = 'production'
module.exports = withPlugins(
  [[optimizedImages, { optimizeImagesInDev: true }]],
  config[TARGET]
)
