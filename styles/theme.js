import { extendTheme } from '@chakra-ui/react'

const customTheme = extendTheme({
  fonts: {
    heading: `"Libre Baskervville",serif`,
    body: `Poppins,-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"`
  },
  fontWeights: {
    normal: 400,
    medium: 600,
    bold: 700
  },
  textStyles: {
    h1: {
      letterSpacing: '0.05em',
      fontSize: '250%'
    },
    h3: {
      letterSpacing: '0.05em',
      fontSize: '135%'
    },
    h4: {
      letterSpacing: '0.05em',
      fontSize: '100%'
    }
  }
})

export default customTheme
