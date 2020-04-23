import {parse} from '@wordpress/block-serialization-default-parser'
import {Box, Heading} from 'theme-ui'
import Block from './blocks'

/**
 * Single.
 *
 * @prop {object} node
 */
export default ({node: {title, content}}) =>
  <Box as={'article'}>
    <Heading as={'h2'}>{title}</Heading>

    <Box>
      {parse(content).map(block => <Block block={block} />)}
    </Box>
  </Box>
