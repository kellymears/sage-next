/** Styled */
import styled from '@emotion/styled'
import { darken } from 'polished'

/**
 * Styles
 */
const Heading = styled.h1`
  > a {
    cursor: pointer;
    transition: all ease-in-out 0.2s;

    &:active, &:visited {
      color: ${({theme}) => theme.colors.text};
    }

    &:hover {
      color: ${({theme}) => darken(0.2, theme.colors.text)};
      transition: all ease-in-out 0.2s;
    }
  }
`

export default Heading
