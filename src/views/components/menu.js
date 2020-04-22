/** Next */
import Link from 'next/link'

/** theme-ui */
import {Box, NavLink} from 'theme-ui'

/**
 * Component: Menu
 *
 * @prop {array} items
 */
const Menu = ({items}) =>
  <Box as={'nav'} ml={'auto'}>
    {items.map(({slug, label, url }) =>
      <Link href={url} as={url} passHref>
        <NavLink href={slug} p={2} variant={'styles.navlink'}>
          {label}
        </NavLink>
      </Link>
    )}
  </Box>

export default Menu
