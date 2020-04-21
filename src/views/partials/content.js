import Link from 'next/link'
import { Box, Heading } from 'theme-ui'

/**
 * Partials: Content
 *
 * @prop {string} title
 * @prop {string} uri
 * @prop {string} excerpt
 */
const Content = ({ title, uri, excerpt }) =>
  <Box as={'article'}>
    <Heading as={'h2'}>
      <Link href={`/${uri}`} as={`/${uri}`}>
        {title}
      </Link>
    </Heading>

    <Box dangerouslySetInnerHTML={{__html: excerpt || null }} />
  </Box>

export default Content
