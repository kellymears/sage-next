import Link from 'next/link'
import { Box, Heading } from 'theme-ui'

/**
 * Partials: Content
 *
 * @prop {string} title
 * @prop {string} linkAs
 * @prop {string} linkHref
 * @prop {string} excerpt
 */
const Content = ({title, linkAs, linkHref, excerpt}) =>
  <Box as={'article'}>
    <Heading as={'h2'}>
      <Link href={linkHref} as={linkAs}>
        {title}
      </Link>
    </Heading>

    <Box dangerouslySetInnerHTML={{
      __html: excerpt || null,
    }} />
  </Box>

export default Content
