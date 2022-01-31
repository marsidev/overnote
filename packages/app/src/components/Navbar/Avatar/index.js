import React from 'react'
import { Image } from '@chakra-ui/react'

const Avatar = ({ avatar }) => {
  return (
    <Image
      borderRadius='full'
      boxSize={['1.4em', '1.6em', '1.8em', '2em']}
      src={avatar}
      mr={2}
      verticalAlign={'bottom'}
    />
  )
}

export default Avatar
