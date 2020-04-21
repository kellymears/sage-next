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
      title={app.settings.title}
      description={app.settings.description}
      menu={app.menu || []}
    />

    <main>{children}</main>
  </Container>

export default Layout
