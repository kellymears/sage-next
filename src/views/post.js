import {Box, Heading, Image, Text} from 'theme-ui'

/**
 * Post
 *
 * @prop {string} title
 * @prop {string} content
 * @prop {object} featuredImage
 */
export default ({title, content, featuredImage, author}) => (
  <Box as={'article'}>
    <Heading as={'h2'}>{title}</Heading>
    {featuredImage && (
      <picture>
        <Image
          my={2}
          srcSet={featuredImage.srcSet}
          src={featuredImage.sourceUrl}
          type={featuredImage.mimeType} />
      </picture>
    )}
    {author.firstName && (
      <Text>by {author.firstName} {author.lastName}</Text>
    )}
    <Box dangerouslySetInnerHTML={{
      __html: content
    }} />
  </Box>
)
