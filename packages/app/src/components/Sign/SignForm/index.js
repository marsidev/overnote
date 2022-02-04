import React, { useEffect, useState } from 'react'
import { Box, Heading, FormControl, FormLabel, Input, Button, useColorModeValue, Text } from '@chakra-ui/react'
import { useLocation, Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const SignForm = (props) => {
  const { handleSign, isLoading, headingText, error, setError } = props

  const [username, setUsername] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [pageCount, setPageCount] = useState(0)

  const boxShadow = useColorModeValue('lg', 'rgba(136, 153, 166, 20%) 0px 2px 15px 0px')
  const { pathname: path, state } = useLocation()
  const previousPath = state?.from || 'unknown'

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
  }, [path])

  const variants = {
    pre_launch: {
      scale: 0.4,
      opacity: 0.8,
      y: '100%',
      transition: { duration: 0.3, ease: 'easeOut' }
    },
    launch: {
      scale: 1,
      opacity: 1,
      y: 65,
      transition: { duration: 0.3, ease: 'easeOut' }
    },
    pre_flip: {
      scale: 1,
      opacity: 1,
      y: 65,
      rotateY: 180,
      transition: { duration: 0.3, ease: 'easeOut' }
    },
    flip: {
      scale: 1,
      opacity: 1,
      y: 65,
      rotateY: 0,
      transition: { duration: 0.3, ease: 'easeOut' }
    }
  }

  let animate
  if (previousPath !== 'unknown') {
    if (path === '/register' && previousPath === '/login') animate = 'flip'
    else if (path === '/login' && previousPath === '/register') animate = 'flip'
    else animate = 'launch'
  } else animate = 'launch'

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
        initial={`pre_${animate}`}
        animate={animate}
        key={pageCount}
      >
        <Box
          p={8}
          maxWidth='520px'
          w={['360px', '440px', '480px', '520px']}
          borderWidth={1}
          borderRadius={8}
          boxShadow={boxShadow}
        >
          <Box textAlign='center'>
            <Heading>{headingText}</Heading>
          </Box>

          <Box my={4} textAlign='left'>
            <form onSubmit={handleSubmit} autoComplete='off'>
              {path === '/register' && (
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
                {path === '/login' ? 'Sign in' : 'Sign up'}
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
            {path === '/login'
              ? 'Not registered yet? '
              : 'Already registered? '}
            <Link
              to={path === '/login' ? '/register' : '/login'}
              state={{ from: path }}
              style={{ color: '#006da0' }}
            >
              {path === '/login' ? 'Register' : 'Login'}
            </Link>
          </Box>
        </Box>
      </motion.div>
    </Box>
  )
}

export default SignForm
