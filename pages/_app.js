/** Next */
import Head from 'next/head'

/** @theme-ui */
import { ThemeProvider } from 'theme-ui'
import theme from '../theme'

/**
 * Application
 *
 * @prop {object} Component
 * @prop {object} pageProps
 */
const Application = ({ Component, pageProps }) => (
  <>
    <Head>
      <meta charset="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>

    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  </>
)

export default Application
