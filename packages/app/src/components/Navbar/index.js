import React from 'react'
import { useColorMode } from '@chakra-ui/react'
import { useCssProps } from '@Hooks'
import Brand from '@Components/Navbar/Brand'
import NavbarContainer from '@Components/Navbar/NavbarContainer'
import NavbarItems from '@Components/Navbar/NavbarItems'
import MobileNavbar from '@Components/MobileNavbar'
import { DesktopView, MobileView } from '@Components/DeviceDetect'

const NavBar = (props) => {
  const { colorMode, toggleColorMode } = useColorMode()

  useCssProps(colorMode)
  const { className } = props

  return (
    <>
      <MobileView>
        <MobileNavbar
          colorMode={colorMode}
          toggleColorMode={toggleColorMode}
          {...props}
        />
      </MobileView>

      <DesktopView>
        <NavbarContainer colorMode={colorMode} className={className}>
          <Brand w='100px' />
          <NavbarItems
            colorMode={colorMode}
            toggleColorMode={toggleColorMode}
            {...props}
          />
        </NavbarContainer>
      </DesktopView>
    </>
  )
}

export default NavBar
