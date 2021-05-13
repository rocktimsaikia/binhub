import '../styles/global.css'

import { AppProps } from 'next/app'
import { GeistProvider, CssBaseline } from '@geist-ui/react'
import { Provider } from 'next-auth/client'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider session={pageProps.session}>
      <GeistProvider>
        <CssBaseline />
        <Component {...pageProps} />
      </GeistProvider>
    </Provider>
  )
}

export default MyApp
