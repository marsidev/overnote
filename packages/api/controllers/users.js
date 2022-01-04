const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/User')

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('notes', {
    content: 1,
    date: 1
  })
  response.json(users)
})

usersRouter.post('/', async (request, response, next) => {
  try {
    const { body } = request
    const { username, name, password } = body

    if (!username) { return response.status(400).json({ error: 'username is required' }) }
    if (!name) return response.status(400).json({ error: 'name is required' })
    if (!password) { return response.status(400).json({ error: 'password is required' }) }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
      username,
      name,
      passwordHash
    })

    const savedUser = await user.save()

    response.status(201).json(savedUser)
  } catch (error) {
    next(error)
  }
})

module.exports = usersRouter
