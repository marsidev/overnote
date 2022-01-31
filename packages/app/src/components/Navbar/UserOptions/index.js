import React from 'react'
import { MenuList, MenuItem } from '@chakra-ui/react'
import { FaSignOutAlt } from 'react-icons/fa'

const UserOptions = props => {
  const { colorMode, handleLogout, isLoggingOut } = props

  return (
    <MenuList p={0} h={8} bg={colorMode === 'light' ? 'gray.200' : 'gray.700'}>
      <MenuItem
        h='100%'
        onClick={handleLogout}
        closeOnSelect={false}
        isDisabled={isLoggingOut}
        icon={<FaSignOutAlt />}
      >
        {isLoggingOut ? 'Logging out...' : 'Logout'}
      </MenuItem>
    </MenuList>
  )
}

export default UserOptions
