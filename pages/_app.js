import { CSSReset, ThemeProvider } from '@chakra-ui/core'
import theme from '../theme'

/**
 * Application
 */
export default ({ Component, pageProps }) => (
  <ThemeProvider>
    <CSSReset />
    <Component {...pageProps} />
  </ThemeProvider>
)
