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
    {items.map(({label, url}) =>
      <Link href={url !== process.env.url ? `/[slug]` : `/index`} as={url}>
        <NavLink p={2} variant={'styles.navlink'}>
          {label}
        </NavLink>
      </Link>
    )}
  </Box>

export default Menu
