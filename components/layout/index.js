/** @jsx jsx */
import { jsx, Box, Heading, Container } from 'theme-ui'
import Link from 'next/link'

/**
 * Primary layout.
 *
 * @prop {object} app
 * @prop {object} children
 */
export default ({ app, children }) => (
  <Container px={2} mx={'auto'}>
    <Box as={'header'} pt={1} pb={3}>
      <Link as={`/`} href="/">
        <Heading>{app.title}</Heading>
      </Link>
    </Box>
    <main>{children}</main>
  </Container>
)
