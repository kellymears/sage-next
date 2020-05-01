/** Next */
import Link from 'next/link'

/** theme-ui */
import {Box, NavLink} from 'theme-ui'

/**
 * Component: Nav
 *
 * @prop {array} menu
 */
const Nav = ({menu}) => (
  <Box as={'nav'}>
    {menu.map(({label, linkHref, linkAs, url}) =>
      linkHref ? (
        <AppLink linkHref={linkHref} linkAs={linkAs} label={label} />
      ) : (
        <ExternalLink url={url} label={label} />
      ),
    )}
  </Box>
)

/**
 * Internal Link
 *
 * @prop {string} linkHref
 * @prop {string} linkAs
 * @prop {string} label
 */
const AppLink = ({linkHref, linkAs, label}) => (
  <Link href={linkHref} as={linkAs}>
    <NavLink p={2} variant={'styles.navlink'}>
      {label}
    </NavLink>
  </Link>
)

/**
 * External link
 *
 * @prop {string} url
 * @prop {string} label
 */
const ExternalLink = ({url, label}) => (
  <NavLink p={2} href={url} variant={'styles.navlink'}>
    {label}
  </NavLink>
)

export default Nav
export {AppLink, ExternalLink}
