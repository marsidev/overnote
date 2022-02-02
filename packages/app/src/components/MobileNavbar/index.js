import React, { useState } from 'react'
import { FaHome, FaSun, FaMoon, FaSignInAlt, FaSignOutAlt } from 'react-icons/fa'
import {
  BottomNavigation as NavContainer,
  BottomNavigationItem as NavItem,
  BottomNavigationIcon as NavIcon,
  BottomNavigationLabel as NavLabel
} from 'chakra-ui-bottom-navigation'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

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
      boxShadow={'rgba(0, 0, 0, 0.19) 0px 4px 12px, rgba(0, 0, 0, 0.23) 0px 4px 4px'}
      {...rest}
    >
      <MotionItem onClick={toggleColorMode} {...navItemsProps}>
        <NavIcon
          as={colorMode === 'light' ? FaMoon : FaSun}
          {...navIconProps}
        />
        <NavLabel>Theme</NavLabel>
      </MotionItem>

      <MotionItem onClick={() => navigate('/')} {...navItemsProps}>
        <NavIcon as={FaHome} {...navIconProps} />
        <NavLabel>Home</NavLabel>
      </MotionItem>

      {user && (
        <MotionItem onClick={handleLogout} {...navItemsProps}>
          <NavIcon as={FaSignOutAlt} {...navIconProps} />
          <NavLabel>Logout</NavLabel>
        </MotionItem>
      )}

      {!user && (
        <MotionItem onClick={() => navigate('/login')} {...navItemsProps}>
          <NavIcon as={FaSignInAlt} {...navIconProps} />
        </MotionItem>
      )}
    </NavContainer>
  )
}

export default MobileNavbar
