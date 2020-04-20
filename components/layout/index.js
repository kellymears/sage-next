import Link from 'next/link'

import { App, Container, Main } from '../app'
import Mast from '../styled/Mast'
import Heading from '../styled/Heading'

/**
 * Primary layout.
 */
export default props => (
  <App>
    <Mast>
      <Container>
        <Heading>
          <Link href={`/`} as={`/`}>
            {props.app.title}
          </Link>
        </Heading>
      </Container>
    </Mast>

    <Container>
      <Main>
        {props.children}
      </Main>
    </Container>
  </App>
)
