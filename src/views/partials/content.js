import Link from 'next/link'
import {Box, Heading} from 'theme-ui'

/**
 * Partials: Content
 *
 * @prop {string} title
 * @prop {string} linkAs
 * @prop {string} linkHref
 * @prop {string} excerpt
 */
const Content = ({title, linkAs, linkHref, excerpt}) =>
  <Box as="article" pb={2}>
    <Heading as="h2" variant="styles.heading">
      <Link href={linkHref} as={linkAs}>
        {title}
      </Link>
    </Heading>

    {excerpt &&
      <Box dangerouslySetInnerHTML={{
        __html: excerpt,
      }} />
    }
  </Box>

export default Content
