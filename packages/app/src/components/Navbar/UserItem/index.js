import React from 'react'
import { Menu, MenuButton, Button, Flex, Avatar } from '@chakra-ui/react'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'
import UserOptions from '@Components/Navbar/UserOptions'
import { motion } from 'framer-motion'
import { basicButtonVariants as variants } from '@Utils/animations'

const ChevronMotion = ({ isMobile }) => {
  return (
    <motion.div
      variants={variants}
      initial='initial'
      whileTap='tap'
      whileHover='hover'
    >
      {isMobile ? <FaChevronUp /> : <FaChevronDown />}
    </motion.div>
  )
}

const UserItem = props => {
  const { user, handleLogout, colorMode, isLoggingOut, isMobile } = props

  return (
    <Menu autoSelect={false}>
      <MenuButton
        as={Button}
        rightIcon={<ChevronMotion isMobile={isMobile} />}
        transition='all 0.2s'
        borderWidth='0'
        variant='outline'
        _hover={{ bg: 'transparent' }}
        _expanded={{ bg: 'transparent' }}
        _active={{ bg: 'transparent' }}
        size={'md'}
        p={0}
      >
        <Flex alignItems={'center'} fontSize='sm'>
          <Avatar
            src={user.avatar}
            name={user.name}
            boxSize={['1.4em', '1.6em', '1.8em', '2em']}
            bg='rgb(255, 255, 255, 0.0)'
            mx={1}
          />
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
