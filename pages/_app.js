import { ChakraProvider } from '@chakra-ui/react'
import { css, Global } from '@emotion/react'

import { AuthProvider } from '@/lib/auth'
import { ProfileProvider } from '@/lib/profile'
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
          }
          @font-face {
            font-family: 'Baskerville';
            font-style: normal;
            font-weight: 400;
            font-display: swap;
            src: url(Baskerville-Semibold.otf) format('otf');
          }
          body {
            background-color: #d6d6d6;
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
        <ProfileProvider>
          <GlobalStyle>
            <Component {...pageProps} />
          </GlobalStyle>
        </ProfileProvider>
      </AuthProvider>
    </ChakraProvider>
  )
}

export default MpgApp
