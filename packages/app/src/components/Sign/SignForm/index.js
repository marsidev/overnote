/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { Box, Heading, FormControl, FormLabel, Input, Button, useColorModeValue, Text } from '@chakra-ui/react'
import { useLocation, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { isMobile } from '@Components/DeviceDetect'

const SignForm = (props) => {
  const { handleSign, isLoading, headingText, error, setError } = props

  const [username, setUsername] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [pageCount, setPageCount] = useState(0)
  const mobile = isMobile()

  const boxShadow = useColorModeValue('lg', 'rgba(136, 153, 166, 20%) 0px 2px 15px 0px')
  const pathName = useLocation().pathname

  const handleSubmit = async event => {
    event.preventDefault()
    try {
      await handleSign({ name, username, password })
      setUsername('')
      setPassword('')
    } catch (e) {
      console.log(e)
    }
  }

  const MotionButton = motion(Button)

  useEffect(() => {
    setName('')
    setUsername('')
    setPassword('')
    setError(null)
    setPageCount(pageCount + 1)
  }, [pathName])

  const variants = {
    entering: {
      scale: 0.8, opacity: 0, y: 100
    },
    entered: {
      scale: 1, opacity: 1, transition: { duration: 0.2, ease: 'easeOut' }
    }
  }

  return (
    <Box
      display='flex'
      justifyContent='center'
      alignItems='center'
      flexDirection='column'
      h='68vh'
    >
      <motion.div
        variants={variants}
        initial='entering'
        animate='entered'
        key={pageCount}
      >
        <Box
          p={8}
          maxWidth='540px'
          w={['380px', '460px', '500px', '540px']}
          borderWidth={1}
          borderRadius={8}
          boxShadow={boxShadow}
        >
          <Box textAlign='center'>
            <Heading>{headingText}</Heading>
          </Box>

          <Box my={4} textAlign='left'>
            <form onSubmit={handleSubmit} autoComplete='off'>
              {pathName === '/register' && (
                <FormControl pb={4} autoComplete='off'>
                  <FormLabel>Name</FormLabel>
                  <Input
                    required
                    type='text'
                    placeholder='Name'
                    value={name}
                    onChange={({ target }) => setName(target.value)}
                    autoComplete='off'
                  />
                </FormControl>
              )}

              <FormControl pb={4} autoComplete='off'>
                <FormLabel>Username</FormLabel>
                <Input
                  required
                  type='text'
                  placeholder='Username'
                  value={username}
                  onChange={({ target }) => setUsername(target.value)}
                  autoComplete='off'
                />
              </FormControl>

              <FormControl pb={4} autoComplete='off'>
                <FormLabel>Password</FormLabel>
                <Input
                  required
                  type='password'
                  placeholder='Password'
                  value={password}
                  onChange={({ target }) => setPassword(target.value)}
                  autoComplete='off'
                />
              </FormControl>

              <MotionButton
                width='full'
                mt={4}
                type='submit'
                isLoading={isLoading}
                loadingText='Signing in...'
                whileTap={{ scale: 0.9 }}
                whileHover={{ scale: 1.1 }}
              >
                {pathName === '/login' ? 'Sign in' : 'Sign up'}
              </MotionButton>
            </form>
          </Box>

          {error && (
            <Box
              textAlign='center'
              bg={useColorModeValue('red.200', 'red.300')}
              color={useColorModeValue('black', 'white')}
              p={2}
              borderRadius={8}
            >
              <Text>{error}</Text>
            </Box>
          )}

          <Box textAlign='center' mt={4}>
            {pathName === '/login'
              ? 'Not registered yet? '
              : 'Already registered? '}
            <Link
              to={pathName === '/login' ? '/register' : '/login'}
              style={{ color: '#006da0' }}
            >
              {pathName === '/login' ? 'Register' : 'Login'}
            </Link>
          </Box>
        </Box>
      </motion.div>
    </Box>
  )
}

export default SignForm
