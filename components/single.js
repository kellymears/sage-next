import { Box, Heading } from 'theme-ui'

/**
 * Single article template
 */
export default ({post}) =>
  <Box as={'article'}>
    <Heading as={'h2'}>
      {post.title}
    </Heading>
    <Box dangerouslySetInnerHTML={{__html: post.content || null }} />
  </Box>
