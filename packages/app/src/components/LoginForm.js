import React, { useState } from 'react'
import Togglable from './Togglable.js'
import PropTypes from 'prop-types'
import { Form } from 'semantic-ui-react'
import noteService from '../services/notes'
import loginService from '../services/login'

export default function LoginForm ({ handleSubmit }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async event => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password
      })

      noteService.setToken(user.token)

      handleSubmit({ user, error: null })
      setUsername('')
      setPassword('')
    } catch (e) {
      const error = e.response.data.error || 'Wrong credentials 🤷‍♂️'
      handleSubmit({ user: null, error })
    }
  }

  return (
    // Togable is a component that is used to show/hide a form using the children component
    <Togglable buttonLabel='Show Login'>
      <Form onSubmit={handleLogin}>
        <div>
          <Form.Input
            type='text'
            value={username}
            name='Username'
            placeholder='Username'
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          <Form.Input
            type='password'
            value={password}
            name='Password'
            placeholder='Password'
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <Form.Button fluid primary content='Login' id='login-form-submit-btn' />
      </Form>
    </Togglable>
  )
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  username: PropTypes.string
}
