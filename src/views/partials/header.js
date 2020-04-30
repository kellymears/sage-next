/** Next */
import Link from 'next/link'

/** theme-ui */
import {Box, Flex, Heading} from 'theme-ui'

/** Components */
import Nav from '../components/Nav'

/**
 * Partials: Header
 *
 * @prop {string} title
 * @prop {string} description
 * @prop {array}  menu
 */
const Header = ({title, description, menu}) =>
  <Flex as="header" variant="styles.header" my={3}>
    <Link as="/" href="/">
      <Heading as="h1" fontSize={3} variant="styles.heading" cursor="pointer">
        {title}
      </Heading>
    </Link>

    <Box ml={'auto'}>
      <Nav menu={menu} />
    </Box>
  </Flex>

export default Header
