import { ChakraProvider } from '@chakra-ui/react'
import { css, Global } from '@emotion/react'

import { AuthProvider } from '@/lib/auth'
import customTheme from '@/styles/theme'

const GlobalStyle = ({ children }) => {
  return (
    <>
      <Global
        styles={css`
          html {
            min-width: 360px;
            scroll-behavior: smooth;
          }
          #__next {
            display: flex;
            flex-direction: column;
            min-height: 100vh;
          }
        `}
      />
      {children}
    </>
  )
}

function MpgApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={customTheme}>
      <AuthProvider>
        <GlobalStyle>
          <Component {...pageProps} />
        </GlobalStyle>
      </AuthProvider>
    </ChakraProvider>
  )
}

export default MpgApp
