import React, { useState } from 'react'
import {
  FaSignInAlt as LoginIcon,
  FaSignOutAlt as LogoutIcon
} from 'react-icons/fa'
import {
  RiHomeFill as HomeIcon,
  RiSunFill as SunIcon,
  RiMoonFill as MoonIcon
} from 'react-icons/ri'
import {
  BottomNavigation as NavContainer,
  BottomNavigationItem as NavItem,
  BottomNavigationIcon as NavIcon,
  BottomNavigationLabel as NavLabel
} from 'chakra-ui-bottom-navigation'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Spinner } from '@chakra-ui/react'

const navIconProps = {
  h: 4,
  w: 4,
  verticalAlign: 'middle'
}

const MobileNavbar = (props) => {
  const [index, setIndex] = useState(0)

  const { colorMode, className, toggleColorMode, handleLogout, user, isLoggingOut, ...rest } = props
  const navigate = useNavigate()

  const MotionItem = motion(NavItem)
  const variants = {
    initial: { scale: 1 },
    tap: { scale: 0.9, transition: { duration: 0.1, ease: 'easeOut' } },
    hover: { scale: 1.1, transition: { duration: 0.1, ease: 'easeOut' } }
  }

  const navItemsProps = {
    variants,
    initial: 'initial',
    whileTap: 'tap',
    whileHover: 'hover',
    opacity: 1
  }

  return (
    <NavContainer
      value={index}
      onChange={newIndex => setIndex(newIndex)}
      as='nav'
      bg={colorMode === 'light' ? 'white' : 'gray.800'}
      variant='float'
      showLabel='never'
      className={`${className}__mobile`}
      boxShadow={
        'rgba(0, 0, 0, 0.19) 0px 4px 12px, rgba(0, 0, 0, 0.23) 0px 4px 4px'
      }
      {...rest}
    >
      <MotionItem onClick={toggleColorMode} {...navItemsProps}>
        <NavIcon
          as={colorMode === 'light' ? MoonIcon : SunIcon}
          {...navIconProps}
        />
        <NavLabel>Theme</NavLabel>
      </MotionItem>

      <MotionItem onClick={() => navigate('/')} {...navItemsProps}>
        <NavIcon as={HomeIcon} {...navIconProps} />
        <NavLabel>Home</NavLabel>
      </MotionItem>

      {user && (
        <MotionItem
          disabled={isLoggingOut}
          onClick={isLoggingOut ? null : handleLogout}
          {...navItemsProps}
        >
          <NavIcon as={isLoggingOut ? Spinner : LogoutIcon} {...navIconProps} />
          <NavLabel>Logout</NavLabel>
        </MotionItem>
      )}

      {!user && (
        <MotionItem onClick={() => navigate('/login')} {...navItemsProps}>
          <NavIcon as={LoginIcon} {...navIconProps} />
        </MotionItem>
      )}
    </NavContainer>
  )
}

export default MobileNavbar
