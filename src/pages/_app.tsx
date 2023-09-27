import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from './layouts'
import { AppProvider } from '@/context/AppContext'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AppProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AppProvider>
  )
}
