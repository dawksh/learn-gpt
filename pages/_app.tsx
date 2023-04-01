import '../styles/globals.css'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import "@fontsource/inter"

const theme = extendTheme({
  fonts: {
    heading: 'Inter',
    body: 'Inter',
  },
})

export default function App({ Component, pageProps }: AppProps) {
  return <ChakraProvider theme={theme}>
    <Component {...pageProps} />
  </ChakraProvider>
}
