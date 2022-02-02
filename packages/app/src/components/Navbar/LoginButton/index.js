import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@chakra-ui/react'
import { motion } from 'framer-motion'

const LoginButton = ({ colorMode }) => {
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
