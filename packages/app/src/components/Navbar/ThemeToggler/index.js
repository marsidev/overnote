import React from 'react'
import { Button } from '@chakra-ui/react'
import { FaSun, FaMoon } from 'react-icons/fa'
import { motion } from 'framer-motion'
import { basicButtonVariants as variants } from '@Utils/animations'

const ThemeToggler = props => {
  const { colorMode, ...rest } = props

  const MotionButton = motion(Button)

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
