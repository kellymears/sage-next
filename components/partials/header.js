import styled from '@emotion/styled'

const Header = styled.header`
  font-family: ${props => props.theme.fonts.sans};
`

const SiteName = styled.h1`
  font-size: 2rem;
`

export {
  Header,
  SiteName,
}
