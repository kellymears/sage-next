/** Styled components */
import styled from '@emotion/styled'

/**
 * Application Mast
 */
const Mast = styled.header`
  font-family: ${props => props.theme.fonts.sans};
  margin-bottom: ${({theme}) => theme.spacing[5]};
  max-width: 100vw;

  h1 {
    font-size: 2rem;
  }
`

export default Mast
