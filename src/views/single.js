import {Box, Heading} from 'theme-ui'

/**
 * Single template.
 *
 * @prop {object} post
 */
export default ({post: {title, content}}) =>
  <Box as={'article'}>
    <Heading as={'h2'}>
      {title}
    </Heading>
    <Box dangerouslySetInnerHTML={{__html: content}} />
  </Box>
