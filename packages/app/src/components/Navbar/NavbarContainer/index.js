import React from 'react'
import { Box, Flex } from '@chakra-ui/react'

const NavbarContainer = ({ children, colorMode }) => {
  const bgColor = colorMode === 'light' ? 'white' : 'gray.800'

  return (
    <Box
      as='header'
      pos='sticky'
      top={0}
      left={0}
      margin='auto'
      w='100%'
      zIndex={3}
      boxShadow={'rgba(136, 153, 166, 20%) 0px 2px 15px 0px'}
      className='app__navbar'
    >
      <Flex
        align='center'
        justify='space-between'
        p={3}
        color={colorMode === 'light' ? 'black' : 'white'}
        bg={bgColor}
      >
        {children}
      </Flex>
    </Box>
  )
}

export default NavbarContainer
