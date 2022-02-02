import React from 'react'
import { Box, Flex } from '@chakra-ui/react'

const NavbarContainer = ({ children, colorMode, className }) => {
  const bgColor = colorMode === 'light' ? 'white' : 'gray.800'

  return (
    <Box
      as='nav'
      boxShadow={'rgba(136, 153, 166, 20%) 0px 2px 15px 0px'}
      className={className}
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
