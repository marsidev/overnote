import React, { useState, useEffect } from 'react'
import { ChakraProvider, ScaleFade, Flex, Box } from '@chakra-ui/react'
import NavBar from '@Components/Navbar'
import Footer from '@Components/Footer'
import Sign from '@Components/Sign'
import Notes from '@Components/Notes'
import NotFound from '@Components/NotFound'
import noteService from '@Services/notes'
import userService from '@Services/users'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { RequireNoAuth } from '@Utils/routing'
import theme from '@Theme'
import { AnimatePresence } from 'framer-motion'

const App = () => {
  const [user, setUser] = useState(null)
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const [authenticated, setAuthenticated] = useState(false)

  const navigate = useNavigate()

  const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

  const handleSign = async ({ user, error }) => {
    if (error) {
      return console.log(error)
    }

    await sleep(500)
    setUser(user)
    setAuthenticated(true)
    window.localStorage.setItem('AppNoteUser', JSON.stringify(user))
    navigate('/')
  }

  const validateUser = async id => {
    const response = await userService.validate(id)
    const isValid = response?.valid === true
    if (!isValid) {
      setUser(null)
      setAuthenticated(false)
      noteService.setToken(null)
      window.localStorage.removeItem('AppNoteUser')
      window.localStorage.removeItem('AppNoteNotes')
    }
  }

  useEffect(async () => {
    const loggedUserJSON = window.localStorage.getItem('AppNoteUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      setAuthenticated(true)
      noteService.setToken(user.token)
      await validateUser(user.id)
    }
  }, [])

  const handleLogout = async () => {
    setIsLoggingOut(true)
    await sleep(500)
    setUser(null)
    setAuthenticated(false)
    noteService.setToken(null)
    window.localStorage.removeItem('AppNoteUser')
    window.localStorage.removeItem('AppNoteNotes')
    setIsLoggingOut(false)
    navigate('/')
  }

  return (
    <ChakraProvider theme={theme}>
      <AnimatePresence exitBeforeEnter initial={false}>
        <ScaleFade initialScale={0.9} in='true'>
          <Box className='app'>
            <NavBar
              handleLogout={handleLogout}
              user={user}
              isLoggingOut={isLoggingOut}
              className='app__navbar'
            />

            <Box className='app__body'>
              <Flex w='100%' flexDirection='column' alignItems='center'>
                <Routes>
                  <Route
                    path='/'
                    element={<Notes user={user} handleLogout={handleLogout} />}
                  />
                  <Route
                    element={<RequireNoAuth isAuthenticated={authenticated} />}
                  >
                    <Route
                      path='/login'
                      element={<Sign handleSubmit={handleSign} />}
                    />
                    <Route
                      path='/register'
                      element={<Sign handleSubmit={handleSign} />}
                    />
                  </Route>
                  <Route path='*' element={<NotFound />} />
                </Routes>
              </Flex>
            </Box>

            <Footer className='app__footer' />
          </Box>
        </ScaleFade>
      </AnimatePresence>
    </ChakraProvider>
  )
}

export default App
