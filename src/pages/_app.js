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
const Application = ({Component, pageProps}) =>
  <>
    <Head>
      <meta charSet="utf-8" />
      <meta httpEquiv="x-ua-compatible" content="ie=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
    </Head>

    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  </>

export default Application
