import React from 'react'
import { Box, IconButton, Container, Stack, useColorModeValue } from '@chakra-ui/react'
import { FaGithub, FaTwitter } from 'react-icons/fa'
import { isMobile } from '@Components/DeviceDetect'

const TWITTER_URL = 'https://twitter.com/marsigliacr'
const GITHUB_URL = 'https://github.com/marsigliadev/overnote'

const SocialButton = ({ children, href, mobile }) => {
  return (
    <a href={href} target='_blank' rel='noopener noreferrer'>
      <IconButton
        // bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
        variant='ghost'
        borderRadius='full'
        transition={'background 0.3s ease'}
        size={mobile ? 'sm' : 'lg'}
        _hover={
          mobile
            ? null
            : { bg: useColorModeValue('blackAlpha.300', 'whiteAlpha.300') }
        }
      >
        {children}
      </IconButton>
    </a>
  )
}

const Footer = (props) => {
  const mobile = isMobile()
  return (
    <Box
      bg={useColorModeValue('white', 'gray.800')}
      color={useColorModeValue('gray.700', 'gray.200')}
      shadow={'rgba(0, 0, 0, 0.19) 0px 4px 12px, rgba(0, 0, 0, 0.23) 0px 4px 4px'}
      mb={mobile ? '3rem' : null}
      mt={mobile ? '1rem' : '-2rem'}
      {...props}
    >
      <Container
        as={Stack}
        maxW={'6xl'}
        py={mobile ? 0 : 2}
        direction={{ base: 'column', md: 'row' }}
        spacing={4}
        justify={{ base: 'center', md: 'space-between' }}
        align={{ base: 'center', md: 'center' }}
      >
        {/* <Text>© 2020 Chakra Templates. All rights reserved</Text> */}
        <Stack direction={'row'} spacing={mobile ? 2 : 4}>
          <SocialButton href={GITHUB_URL} mobile={mobile}>
            <FaGithub />
          </SocialButton>
          <SocialButton href={TWITTER_URL} mobile={mobile}>
            <FaTwitter />
          </SocialButton>
        </Stack>
      </Container>
    </Box>
  )
}

export default Footer
