import { App, Container } from '../app'
import { Header, SiteName } from '../partials/header'
import Main from '../partials/main'

/**
 * Primary layout.
 */
export default props => (
  <App>
    <Header>
      <Container>
        <SiteName>
          {props.app.title}
        </SiteName>
      </Container>
    </Header>

    <Container>
      <Main>
        {props.children}
      </Main>
    </Container>
  </App>
)
