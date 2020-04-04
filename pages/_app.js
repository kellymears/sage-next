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
    margin: 0 !important;
    max-width: 100vw;
    overflow-x: hidden;
    padding: 0 !important;
  }

  html > body > #__next {
    margin: 0;
    max-width: 100vw;
    padding: 0;
    width: 100%;
  }
`
