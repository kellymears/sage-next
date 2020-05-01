import {Box, Heading, Image, Text} from 'theme-ui'

/**
 * Post
 *
 * @prop {string} title
 * @prop {string} content
 * @prop {object} featuredImage
 */
export default ({title, content, featuredMedia, author}) => (
  <Box as={'article'}>
    <Heading as={'h2'}>{title}</Heading>

    {featuredMedia && (
      <figure>
        <Image my={2} src={featuredMedia} />
      </figure>
    )}

    {author.firstName && (
      <Text>
        by {author.firstName} {author.lastName}
      </Text>
    )}

    <Box dangerouslySetInnerHTML={{__html: content}} />
  </Box>
)
