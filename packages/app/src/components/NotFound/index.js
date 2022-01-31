import React from 'react'
import { Box, Heading } from '@chakra-ui/react'
import { useLocation } from 'react-router-dom'

const NotFound = () => {
  const location = useLocation()
  const route = location.pathname.replace('/', '')

  return (
    <Box padding={4}>
      <Heading as='h1' size='lg'>
        {route ? `404: Page not found for "${route}"` : '404: Page not found'}
      </Heading>
    </Box>
  )
}

export default NotFound
