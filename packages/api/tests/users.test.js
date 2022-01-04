const User = require('../models/User')
const { initialUser, usersToAdd, getUsers, testPost } = require('./helpers')
const { connectToMongo, disconnectFromMongo } = require('../middlewares/mongoose')
const { server } = require('../index')

describe('User tests', () => {
  beforeAll(async () => {
    await connectToMongo()
    await User.deleteMany({})
    const newUser = new User(initialUser)
    await newUser.save()
  }, 10000)

  test('creating a new user', async () => {
    const { respBody: usersAtStart } = await getUsers()

    const newUser = usersToAdd.new_user
    const response = await testPost({ path: '/api/users', expectedStatusCode: 201, payload: newUser, headers: { } })
    expect(response.body.username).toBe(newUser.username)

    const { respBody: usersAtEnd } = await getUsers()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)
  }, 15000)

  test('creation fails with proper statuscode and message if username is already taken', async () => {
    const users = await User.find({})
    const firstUser = users[0].toObject()
    const newUser = { ...usersToAdd.new_user, username: firstUser.username } // usersToAdd.admin
    const response = await testPost({ path: '/api/users', expectedStatusCode: 409, payload: newUser, headers: { } })
    console.log(response.body)
    expect(response.body.error).toBe('username already exists')
  }, 15000)

  test('creating a user with no username will fail', async () => {
    const newUser = usersToAdd.no_username
    const response = await testPost({ path: '/api/users', expectedStatusCode: 400, payload: newUser, headers: {} })
    expect(response.body.error).toBe('username is required')
  }, 10000)

  test('creating a user with no name will fail', async () => {
    const newUser = usersToAdd.no_name
    const response = await testPost({ path: '/api/users', expectedStatusCode: 400, payload: newUser, headers: { } })
    expect(response.body.error).toBe('name is required')
  }, 10000)

  test('creating a user with no password will fail', async () => {
    const newUser = usersToAdd.no_password
    const response = await testPost({ path: '/api/users', expectedStatusCode: 400, payload: newUser, headers: { } })
    expect(response.body.error).toBe('password is required')
  }, 10000)

  afterAll(async () => {
    // delete all users except user with username 'first_user'
    await User.deleteMany({ username: { $ne: 'first_user' } })
    await disconnectFromMongo()
    server.close()
  }, 10000)
})
