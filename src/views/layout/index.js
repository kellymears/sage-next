import {Box, Container, Heading} from 'theme-ui'
import Link from 'next/link'

/**
 * Primary layout.
 *
 * @prop {object} app
 * @prop {object} children
 */
export default ({ app, children }) => (
  <Container mx={'auto'}>
    <Box as={'header'} py={3}>
      <Link as={`/`} href="/">
        <Heading>{app.title}</Heading>
      </Link>
    </Box>

    <main>{children}</main>
  </Container>
)
