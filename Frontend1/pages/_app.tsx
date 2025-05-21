import { MantineProvider } from '@mantine/core'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import '../styles/globals.css'
import Layout from '../components/Layout'

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  
  return (
    <MantineProvider>
        <Component key={router.asPath} {...pageProps} />
    </MantineProvider>
  )
}