import { Box } from 'theme-ui'

/**
 * Component: Block
 */
const Block = ({innerContent}) =>
  <Box dangerouslySetInnerHTML={{__html: innerContent}} />

export default Block

