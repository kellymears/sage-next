import {Box, Heading} from 'theme-ui'

/**
 * Single.
 *
 * @prop {object} node
 */
export default ({node: {title, content}}) =>
  <Box as={'article'}>
    <Heading as={'h2'}>
      {title}
    </Heading>
    <Box dangerouslySetInnerHTML={{__html: content}} />
  </Box>
