import {Box, Flex} from 'theme-ui'
import Nav from './../components/Nav'

/**
 * Footer
 *
 * @prop {object} menu
 * @prop {string} title
 */
export default ({menu, title}) => (
  <Box as="footer" fontSize={1} color="text" bg="background" variant="styles.footer">
    <Flex flexDirection={['column', 'row']} flexWrap="wrap" mx="auto" py={4}>
      <Nav menu={menu} />
      <Box mx="auto" />
      <Box>© {title}</Box>
    </Flex>
  </Box>
)
