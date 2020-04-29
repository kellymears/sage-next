/** Next */
import Link from 'next/link'

/** theme-ui */
import {Box, NavLink} from 'theme-ui'

/**
 * Component: Nav
 *
 * @prop {array} items
 */
const Nav = ({menu}) =>
  <Box as={'nav'} ml={'auto'}>
    {menu.map(({label, nextLinkHref, nextLinkAs, url}) =>
      nextLinkHref ? (
        <Link href={nextLinkHref} as={nextLinkAs}>
          <NavLink p={2} variant={'styles.navlink'}>
            {label}
          </NavLink>
        </Link>
      ) : (
        <NavLink p={2} href={url} variant={'styles.navlink'}>
          {label}
        </NavLink>
      )
    )}
  </Box>

export default Nav
