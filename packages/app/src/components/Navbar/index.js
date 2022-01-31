import React, { useState } from 'react'
import { useColorMode } from '@chakra-ui/react'
import { useCssProps } from '@Hooks'
import Brand from '@Components/Navbar/Brand'
import NavbarContainer from '@Components/Navbar/NavbarContainer'
import NavbarItems from '@Components/Navbar/NavbarItems'

const NavBar = ({ ...props }) => {
  const { colorMode, toggleColorMode } = useColorMode()
  const [isOpen, setIsOpen] = useState(false)
  useCssProps(colorMode)
  const toggleNavbar = () => setIsOpen(!isOpen)

  return (
    <NavbarContainer colorMode={colorMode}>
      {isOpen ? null : <Brand w='100px' />}
      <NavbarItems
        toggleNavbar={toggleNavbar}
        isOpen={isOpen}
        colorMode={colorMode}
        toggleColorMode={toggleColorMode}
        {...props}
      />
    </NavbarContainer>
  )
}

export default NavBar
