import {Box, Heading} from 'theme-ui'
import Block from './components/block'

/**
 * Page
 *
 * @prop {object} node
 */
export default ({title, content}) =>
  <Box as={'article'}>
    <Heading as={'h2'}>{title}</Heading>
    <Box dangerouslySetInnerHTML={{__html: content}} />
  </Box>
