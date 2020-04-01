import { ThemeProvider } from 'emotion-theming'
import { injectGlobal } from 'emotion'
import normalize from 'normalize.css'
import theme from '../theme'

/**
 * Application
 */
export default ({ Component, pageProps }) => (
  <ThemeProvider theme={theme}>
    <Component {...pageProps} />
  </ThemeProvider>
)

/**
 * Global styles
 */
injectGlobal`
  ${normalize}

  html,
  body {
    margin: 0;
    padding: 0;
  }

  html > body > #__next {
    display: inline-block;
    max-width: 100vw;
    width: 100vw;
    overflow-x: hidden;
  }
`
