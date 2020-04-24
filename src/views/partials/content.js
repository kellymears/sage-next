import Link from 'next/link'
import { Box, Heading } from 'theme-ui'

/**
 * Partials: Content
 *
 * @prop {string} title
 * @prop {string} uri
 * @prop {string} excerpt
 */
const Content = ({ title, nextLinkAs, nextLinkHref, excerpt }) =>
  <Box as={'article'}>
    <Heading as={'h2'}>
      <Link href={nextLinkHref} as={nextLinkAs}>
        {title}
      </Link>
    </Heading>

    <Box dangerouslySetInnerHTML={{__html: excerpt || null }} />
  </Box>

export default Content
