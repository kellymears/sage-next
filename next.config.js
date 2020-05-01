const withPlugins = require('next-compose-plugins')
const withOffline = require('next-offline')
const withPino = require('next-pino')

/**
 * Next config.
 */
module.exports = withPlugins([withPino, withOffline], {
  compress: true,
  distDir: 'dist',
  env: {
    version: '1.0.0',
    reqMode: 'no-cors',
    graphQLEndpoint: `${process.env.URL}/wp/graphql`,
    url: process.env.URL,
  },
  webpack: config => config,
  poweredByHeader: false,
})
