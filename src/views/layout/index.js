/** theme-ui */
import {Container} from 'theme-ui'

/** Partials */
import Header from './../partials/header'

/**
 * Primary layout.
 *
 * @prop {object} app
 * @prop {object} children
 */
const Layout = ({ app, children }) =>
  <Container mx={'auto'}>
    <Header
      title={app.title}
      description={app.description}
      menu={app.menus.primary || []}
    />

    <main>{children}</main>
  </Container>

export default Layout
