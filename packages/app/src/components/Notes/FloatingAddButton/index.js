import React, { memo } from 'react'
import { IconButton, useColorModeValue, useToken } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { FaPlus } from 'react-icons/fa'

const FloatingAddButton = (props) => {
  const { openFloatingForm, ...rest } = props

  const MotionButton = motion(IconButton)

  const bgColor = useColorModeValue(
    useToken('colors', 'blue.500'),
    useToken('colors', 'blue.600')
  )

  const bgHoverColor = useColorModeValue(
    useToken('colors', 'blue.400'),
    useToken('colors', 'blue.500')
  )

  const buttonVariants = {
    initial: {
      opacity: 1,
      // scale: 0,
      top: '75%',
      left: '80%',
      transition: { duration: 0.3, ease: 'easeOut' },
      backgroundColor: bgColor
    },
    animate: {
      opacity: 1,
      scale: 1,
      top: '75%',
      left: '80%',
      transition: { duration: 0.5, ease: 'easeOut' },
      backgroundColor: bgColor
    },
    tap: {
      scale: 0.9,
      backgroundColor: bgHoverColor,
      transition: { duration: 0.1, ease: 'easeOut' }
    },
    hover: {
      scale: 1.1,
      backgroundColor: bgHoverColor,
      transition: { duration: 0.1, ease: 'easeOut' }
    }
  }

  return (
    <MotionButton
      layoutId='add-note'
      aria-label='Add note'
      onClick={() => openFloatingForm()}
      variants={buttonVariants}
      initial='initial'
      animate='animate'
      whileTap='tap'
      whileHover='hover'
      variant='solid'
      // bg={useColorModeValue('blue.500', 'blue.600')}
      color='white'
      borderRadius='full'
      border='none'
      zIndex={4}
      size='lg'
      pos='fixed'
      fontSize='20px'
      boxShadow='rgba(0, 0, 0, 0.19) 0px 4px 12px, rgba(0, 0, 0, 0.23) 0px 4px 4px'
      icon={<FaPlus />}
      {...rest}
    />
  )
}

export default memo(FloatingAddButton)
