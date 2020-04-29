/** Next */
import Link from 'next/link'

/** theme-ui */
import {Flex, Heading} from 'theme-ui'

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
  <Flex
    as="header"
    variant="styles.header"
    pt={2}
    pb={3}
  >
    <Link as={`/`} href={`/`}>
      <Heading as={'h1'}>{title}</Heading>
    </Link>
    <Nav menu={menu} />
  </Flex>

export default Header
