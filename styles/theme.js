import { extendTheme } from '@chakra-ui/react'

const customTheme = extendTheme({
  colors: {
    red: {
      50: '#fef0ee',
      100: '#fdd2cd',
      200: '#fdc3bc',
      300: '#fb978a',
      400: '#fa8879',
      500: '#f96a58',
      600: '#e05f4f',
      700: '#ae4a3e',
      800: '#954035',
      900: '#642a23'
    },
    yellow: {
      50: '#fff8ef',
      100: '#ffeacf',
      200: '#ffdcb0',
      300: '#fec780',
      400: '#fec070',
      500: '#feb960',
      600: '#e5a756',
      700: '#cb944d',
      800: '#664a26',
      900: '#332513'
    }
  },
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
