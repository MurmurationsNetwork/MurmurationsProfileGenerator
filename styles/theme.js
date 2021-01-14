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
    h2: {
      letterSpacing: '2.5px',
      fontSize: '250%'
    }
  }
})

export default customTheme
