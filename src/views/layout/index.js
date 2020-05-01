/** theme-ui */
import {Box, Container} from 'theme-ui'

/** Partials */
import Header from './../partials/header'
import Footer from './../partials/footer'

/**
 * Primary layout.
 *
 * @prop {object} app
 * @prop {object} children
 */
const Layout = ({app, children}) => (
  <Container mx={'auto'} px={4}>
    <Header title={app.title} description={app.description} menu={app.menus.primary} />
    <Box as="main">{children}</Box>
    <Footer title={app.title} menu={app.menus.footer} />
  </Container>
)

export default Layout
