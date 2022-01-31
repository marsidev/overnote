import React from 'react'
import { Menu, MenuButton, Button, Flex } from '@chakra-ui/react'
import { FaChevronDown } from 'react-icons/fa'
import Avatar from '@Components/Navbar/Avatar'
import UserOptions from '@Components/Navbar/UserOptions'
import { motion } from 'framer-motion'

const ChevronMotion = () => {
  const variants = {
    initial: { scale: 1 },
    tap: { scale: 0.9, transition: { duration: 0.1, ease: 'easeOut' } },
    hover: { scale: 1.1, transition: { duration: 0.1, ease: 'easeOut' } }
  }

  return (
    <motion.div
      variants={variants}
      initial='initial'
      whileTap='tap'
      whileHover='hover'
    >
      <FaChevronDown />
    </motion.div>
  )
}

const UserItem = props => {
  const { user, handleLogout, isOpen, colorMode, isLoggingOut } = props

  return (
    <Menu autoSelect={false}>
      <MenuButton
        as={Button}
        rightIcon={<ChevronMotion />}
        transition='all 0.2s'
        borderWidth='0'
        variant='outline'
        _hover={{ bg: 'transparent' }}
        _expanded={{ bg: 'transparent' }}
        _active={{ bg: 'transparent' }}
        size={isOpen ? 'sm' : 'md'}
        p={0}
      >
        <Flex alignItems={'center'} fontSize={['sm', 'md', 'md', 'lg']}>
          <Avatar avatar={user.avatar} />
          <span>{user.username}</span>
        </Flex>
      </MenuButton>

      <UserOptions
        colorMode={colorMode}
        handleLogout={handleLogout}
        isLoggingOut={isLoggingOut}
      />
    </Menu>
  )
}

export default UserItem
