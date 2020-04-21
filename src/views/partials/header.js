/** Next */
import Link from 'next/link'

/** theme-ui */
import {Box, Flex, Heading, Text} from 'theme-ui'

/**
 * Partials: Header
 *
 * @prop {string} title
 * @prop {string} description
 * @prop {array}  menu
 */
const Header = ({title, description, menu}) =>
  <Box as={'header'} py={3}>
    <Flex>
      <Box>
        <Link as={`/`} href="/">
          <Heading as={'h1'}>{title}</Heading>
        </Link>
        <Text>{description}</Text>
      </Box>

      <Flex>
        {menu.map(({url, label}) =>
          <Link as={url} href={url}>
            {label}
          </Link>
        )}
      </Flex>
    </Flex>
  </Box>

export default Header
