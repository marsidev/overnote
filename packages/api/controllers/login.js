const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/User')

loginRouter.post('/', async (request, response) => {
  const { body } = request
  const { username, password } = body
  const { NODE_ENV, JWT_SECRET, JWT_DAYS_TO_EXPIRE, JWT_DAYS_TO_EXPIRE_TEST } = process.env

  const daysToExpire =
    NODE_ENV === 'test'
      ? JWT_DAYS_TO_EXPIRE_TEST
      : JWT_DAYS_TO_EXPIRE

  if (!username) return response.status(400).json({ error: 'username is required' })
  if (!password) return response.status(400).json({ error: 'password is required' })
  if (!JWT_SECRET) return response.status(500).json({ error: 'secret key was not found' })

  const user = await User.findOne({ username })

  const passwordCorrect =
    user === null
      ? false
      : await bcrypt.compare(password, user.passwordHash)

  if (!(user && passwordCorrect)) return response.status(401).json({ error: 'invalid username or password' })

  const userForToken = {
    id: user._id,
    username: user.username
  }

  const token = jwt.sign(userForToken, JWT_SECRET, {
    expiresIn: 60 * 60 * 24 * daysToExpire
  })

  response.send({
    name: user.name,
    username: user.username,
    token,
    id: user._id,
    avatar: user.avatar
  })
})

module.exports = loginRouter
