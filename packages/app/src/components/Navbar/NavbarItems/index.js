import React from 'react'
import { Box, Flex } from '@chakra-ui/react'
import ThemeToggler from '@Components/Navbar/ThemeToggler'
import UserItem from '@Components/Navbar/UserItem'
import LoginButton from '@Components/Navbar/LoginButton'

const ItemsContainer = ({ children }) => {
  return (
    <Box flexBasis='auto' align='right'>
      <Flex>
        <Box display={{ base: 'block', sm: 'block' }}>
          <Flex
            spacing={[1, 4, 6, 8]}
            align='center'
            justify='flex-end'
            direction='row'
            pt={[4, 0, 0, 0]}
          >
            {children}
          </Flex>
        </Box>
      </Flex>
    </Box>
  )
}

const NavbarItems = (props) => {
  const { colorMode, toggleColorMode, user, handleLogout, isLoggingOut } = props

  return (
    <ItemsContainer >
      <ThemeToggler onClick={toggleColorMode} />

      {user && (
        <UserItem
          user={user}
          handleLogout={handleLogout}
          colorMode={colorMode}
          isLoggingOut={isLoggingOut}
          isMobile={false}
        />
      )}

      {!user && <LoginButton colorMode={colorMode}/>}
    </ItemsContainer>
  )
}

export default NavbarItems
