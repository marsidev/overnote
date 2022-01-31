const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/User')
const avatarGenerator = require('../utils/avatar')

usersRouter.post('/', async (req, res, next) => {
  try {
    const { body } = req
    const { username, name, password } = body

    if (!username) return res.status(400).json({ error: 'username is required' })
    if (!name) return res.status(400).json({ error: 'name is required' })
    if (!password) return res.status(400).json({ error: 'password is required' })

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const avatar = avatarGenerator()

    const user = new User({ username, name, passwordHash, avatar })
    const savedUser = await user.save()

    res.status(201).json(savedUser)
  } catch (error) {
    next(error)
  }
})

usersRouter.get('/validate/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    // const user = await User.findById(id)
    const user = await User.findOne({ id })
    if (!user) return res.status(201).json({ valid: false })
    res.json({ valid: true })
  } catch (error) {
    next(error)
  }
})

module.exports = usersRouter
