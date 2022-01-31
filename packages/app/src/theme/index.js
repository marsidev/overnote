import { extendTheme } from '@chakra-ui/react'

const components = {
  Button: {
    baseStyle: {
      _focus: {
        boxShadow: 'none'
      }
    },
    variants: {
      'with-shadow': {
        bg: 'red.400',
        boxShadow: '0 0 2px 2px #efdfde'
      }
    }
  }
}

const theme = extendTheme({
  initialColorMode: 'light',
  useSystemColorMode: true,
  components
})

export default theme
