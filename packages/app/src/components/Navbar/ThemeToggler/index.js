import React from 'react'
import { Button } from '@chakra-ui/react'
import { FaSun, FaMoon } from 'react-icons/fa'
import { motion } from 'framer-motion'

const ThemeToggler = props => {
  const { colorMode, ...rest } = props

  const MotionButton = motion(Button)
  const variants = {
    initial: { scale: 1 },
    tap: { scale: 0.9, transition: { duration: 0.1, ease: 'easeOut' } },
    hover: { scale: 1.1, transition: { duration: 0.1, ease: 'easeOut' } }
  }

  return (
    <MotionButton
      variants={variants}
      initial='initial'
      whileTap='tap'
      whileHover='hover'
      variant='ghost'
      p={0}
      size={'md'}
      {...rest}
    >
      {colorMode === 'light' ? <FaMoon /> : <FaSun />}
    </MotionButton>
  )
}

export default ThemeToggler
