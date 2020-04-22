const common = require('./next.common')

/**
 * Asset prefix must be set to the build dir from
 * WordPress' webroot if not deploying to a CDN.
 */
module.exports = {
  ...common,
  env: {
    ...common.env,
    graphQLEndpoint: 'http://kellymears.vagrant/wp/graphql',
    url: 'http://kellymears.vagrant',
  },
}