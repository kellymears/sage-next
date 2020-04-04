import Link from 'next/link'
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
          <Link href={`/`} as={`/`}>
            <a>{props.app.title}</a>
          </Link>
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
