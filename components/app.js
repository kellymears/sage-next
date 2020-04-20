import styled from '@emotion/styled'

/**
 * Application wrapper
 */
const App = styled.div`
  background-color: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};
  display: inline-block;
  font-family: ${props => props.theme.fonts.sans};
  min-height: 100vh;
  max-width: 100vw;
  padding: 0;
  width: 100%;
`

/**
 * Container
 */
const Container = styled.div`
  max-width: 100vw;
  width: 900px;
  margin-left: auto;
  margin-right: auto;
  padding-left: ${({theme}) => theme.spacing[2]};
  padding-right: ${({theme}) => theme.spacing[2]};
`

/**
 * Main el
 */
const Main = styled.main`
  font-family: ${props => props.theme.fonts.sans};
`

export {
  App,
  Container,
  Main,
}
