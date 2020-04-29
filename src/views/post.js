import {Box, Heading, Image} from 'theme-ui'

/**
 * Post
 *
 * @prop {object} node
 */
export default ({title, content, image}) => {
  return (
    <Box as={'article'}>
      <Heading as={'h2'}>{title}</Heading>
      {image && (
        <Image maxWidth={'100%'} src={image} />
      )}
      <Box dangerouslySetInnerHTML={{__html: content}} />
    </Box>
  )
}
