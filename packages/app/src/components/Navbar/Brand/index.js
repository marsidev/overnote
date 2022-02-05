import React from 'react'
import { Link } from 'react-router-dom'
import { Flex, Image, Text } from '@chakra-ui/react'

const APP_NAME = 'Overnote'

const Brand = props => {
  return (
    <Link to='/'>
      <Flex {...props} align='center'>
        <Image
          // borderRadius='full'
          boxSize='40px'
          src={'static/images/logo.png'}
          float='left'
        />
        <Text
          fontSize='md'
          fontWeight='semibold'
          display='block'
          paddingLeft='8px'
        >
          {APP_NAME}
        </Text>
      </Flex>
    </Link>
  )
}

export default Brand
