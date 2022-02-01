/* eslint no-unused-vars: 0 */
import React from 'react'
import { Box, IconButton, Container, Stack, Text, useColorModeValue } from '@chakra-ui/react'
import { FaGithub, FaTwitter } from 'react-icons/fa'

const TWITTER_URL = 'https://twitter.com/masigliacr'
const GITHUB_URL = 'https://github.com/marsigliadev/notes-app-monorepo'

const SocialButton = ({ children, href }) => {
  return (
    <a href={href} target='_blank' rel='noopener noreferrer' >
      <IconButton
        bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
        variant='ghost'
        borderRadius='full'
        transition={'background 0.3s ease'}
        _hover={{
          bg: useColorModeValue('blackAlpha.300', 'whiteAlpha.300')
        }}
      >
        {children}
      </IconButton>
    </a>
  )
}

const Footer = (props) => {
  return (
    <Box
      bg={useColorModeValue('white', 'gray.800')}
      color={useColorModeValue('gray.700', 'gray.200')}
      shadow={'rgba(136, 153, 166, 20%) 0px 2px 15px 0px'}
      {...props}
    >
      <Container
        as={Stack}
        maxW={'6xl'}
        py={2}
        direction={{ base: 'column', md: 'row' }}
        spacing={4}
        justify={{ base: 'center', md: 'space-between' }}
        align={{ base: 'center', md: 'center' }}
      >
        {/* <Text>© 2020 Chakra Templates. All rights reserved</Text> */}
        <Stack direction={'row'} spacing={4}>
          <SocialButton href={GITHUB_URL}>
            <FaGithub />
          </SocialButton>
          <SocialButton href={TWITTER_URL}>
            <FaTwitter />
          </SocialButton>
        </Stack>
      </Container>
    </Box>
  )
}

export default Footer
