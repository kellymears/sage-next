import { injectGlobal } from 'emotion'

injectGlobal`
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
