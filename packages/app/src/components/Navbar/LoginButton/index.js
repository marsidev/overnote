import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { basicButtonVariants as variants } from '@Utils/animations'

const LoginButton = ({ colorMode }) => {
  const MotionButton = motion(Button)

  return (
    <Link to='/login'>
      <MotionButton
        variants={variants}
        initial='initial'
        whileTap='tap'
        whileHover='hover'
        variant='solid'
        colorScheme={colorMode === 'light' ? 'blue' : 'gray'}
        size='md'
        mr={2}
      >
        Login
      </MotionButton>
    </Link>
  )
}

export default LoginButton
