import React, { memo } from 'react'
import { IconButton, useColorModeValue } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { FaPlus } from 'react-icons/fa'
import { floatingButtonVariants } from '@Utils/animations'

const FloatingAddButton = (props) => {
  const { openFloatingForm, ...rest } = props

  const MotionButton = motion(IconButton)

  return (
    <MotionButton
      layout
      layoutId='add-note'
      aria-label='Add note'
      onClick={() => openFloatingForm()}
      variants={floatingButtonVariants}
      initial='initial'
      animate='animate'
      whileTap='tap'
      whileHover='hover'
      variant='solid'
      bg={useColorModeValue('blue.500', 'blue.600')}
      color='white'
      _hover={{ bg: useColorModeValue('blue.400', 'blue.500') }}
      _active={{ bg: useColorModeValue('blue.400', 'blue.500') }}
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
