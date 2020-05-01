/**
 * Next config.
 */
module.exports = {
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
}
