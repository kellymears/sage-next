import styled from '@emotion/styled'

const App = styled.div`
  background-color: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};
  display: inline-block;
  font-family: ${props => props.theme.fonts.sans};
  min-height: 100vh;
  max-width: 100vw;
  padding: 0;
  width: 100vw;
`

const Container = styled.div`
  max-width: 900px;
  margin-left: auto;
  margin-right: auto;
`

export {
  App,
  Container,
}