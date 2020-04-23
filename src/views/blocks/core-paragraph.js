import {Text} from 'theme-ui'

/**
 * core/paragraph
 *
 * @prop {array} children
 */
export default ({ attrs, innerBlocks, innerHTML }) =>
  attrs.text ? <Text mb={2}>{attrs.text}</Text> : null
