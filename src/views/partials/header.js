/** Next */
import Link from 'next/link'

/** theme-ui */
import {
  Box,
  Flex,
  Heading,
  Text,
} from 'theme-ui'

/** Components */
import Menu from '../components/menu'

/**
 * Partials: Header
 *
 * @prop {string} title
 * @prop {string} description
 * @prop {array}  menu
 */
const Header = ({title, description, menu}) =>
  <Flex
    as={'header'}
    alignItems={'center'}
    variant={'styles.header'}
    pt={2}
    pb={3}>
    <Link as={`/`} href="/">
      <Heading as={'h1'}>{title}</Heading>
    </Link>
    <Menu items={menu} />
  </Flex>

export default Header
