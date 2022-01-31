import React from 'react'
import { Link } from 'react-router-dom'
import { Box, Flex, Button } from '@chakra-ui/react'
import { MdMenu, MdClose } from 'react-icons/md'
import ThemeToggler from '@Components/Navbar/ThemeToggler'
import UserItem from '@Components/Navbar/UserItem'
import { motion } from 'framer-motion'

const NavToggler = ({ toggler, isOpen }) => {
  return (
    <Box display={{ base: 'block', sm: 'none' }} onClick={toggler}>
      {isOpen ? <MdClose /> : <MdMenu />}
    </Box>
  )
}

const LoginButton = ({ isOpen }) => {
  const MotionButton = motion(Button)
  const variants = {
    initial: { scale: 1 },
    tap: { scale: 0.9, transition: { duration: 0.1, ease: 'easeOut' } },
    hover: { scale: 1.1, transition: { duration: 0.1, ease: 'easeOut' } }
  }

  return (
    <Link to='/login'>
      <MotionButton
        variants={variants}
        initial='initial'
        whileTap='tap'
        whileHover='hover'
        variant='solid'
        colorScheme='teal'
        size={isOpen ? 'sm' : 'md'}
        mr={2}
      >
        Login
      </MotionButton>
    </Link>
  )
}

const ItemsContainer = ({ children, ...props }) => {
  const { isOpen, toggleNavbar } = props
  return (
    <Box flexBasis={{ base: '100%', md: 'auto' }} align='right'>
      <Flex marginTop={isOpen ? '.8rem' : ''}>
        <NavToggler toggler={toggleNavbar} isOpen={isOpen} />

        <Box display={{ base: isOpen ? 'block' : 'none', sm: 'block' }}>
          <Flex
            spacing={[1, 4, 6, 8]}
            align='center'
            justify={['center', 'flex-end', 'flex-end', 'flex-end']}
            direction={['column', 'row', 'row', 'row']}
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
  const { colorMode, toggleColorMode, isOpen, toggleNavbar, user, handleLogout, isLoggingOut } = props

  return (
    <ItemsContainer isOpen={isOpen} toggleNavbar={toggleNavbar}>
      <ThemeToggler onClick={toggleColorMode} isOpen={isOpen} />

      {user && (
        <UserItem
          user={user}
          handleLogout={handleLogout}
          isOpen={isOpen}
          colorMode={colorMode}
          isLoggingOut={isLoggingOut}
        />
      )}

      {!user && <LoginButton isOpen={isOpen} />}
    </ItemsContainer>
  )
}

export default NavbarItems
