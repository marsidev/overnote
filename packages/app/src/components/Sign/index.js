import React, { useState } from 'react'
import noteService from '@Services/notes'
import usersService from '@Services/users'
import loginService from '@Services/login'
import SignForm from '@Components/Sign/SignForm'
import { useLocation } from 'react-router-dom'

const Sign = ({ handleSubmit }) => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const { pathname: path } = useLocation()

  const handleSign = async payload => {
    try {
      setError(null)
      setIsLoading(true)

      if (path === '/register') await usersService.register(payload)

      const user = await loginService.login(payload)
      noteService.setToken(user.token)
      setIsLoading(false)
      handleSubmit({ user, error: null })
    } catch (e) {
      const error = e.response.data.error || 'Wrong credentials 🤷‍♂️'
      setError(error)
      setIsLoading(false)
      handleSubmit({ user: null, error })
    }
  }

  return (
    <SignForm
      handleSign={handleSign}
      isLoading={isLoading}
      headingText={path === '/login' ? 'Login' : 'Register'}
      error={error}
      setError={setError}
    />
  )
}

export default Sign
