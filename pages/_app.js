/** Next */
import Head from 'next/head'

/** Theme provider */
import { ThemeProvider } from 'emotion-theming'

/** Application theme */
import './../theme/global'
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
