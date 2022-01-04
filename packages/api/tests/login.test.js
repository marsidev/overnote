const { server } = require('../index')
const { api, loginCredentials } = require('./helpers')
const { disconnectFromMongo } = require('../middlewares/mongoose')

// beforeAll(async () => {
//   await server.start()
// })

test('An user can login', async () => {
  const response = await api
    .post('/api/login')
    .send({
      username: loginCredentials.username,
      password: loginCredentials.password
    })
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const { body: { token } } = response
  console.log({ token })
  expect(token).toBeDefined()
}, 10000)

test('An user cannot login if username is not provided', async () => {
  const response = await api
    .post('/api/login')
    .send({ password: loginCredentials.password })
    .expect(400)
    .expect('Content-Type', /application\/json/)

  const { body: { token } } = response
  expect(token).toBeUndefined()
}, 10000)

test('An user cannot login if password is not provided', async () => {
  const response = await api
    .post('/api/login')
    .send({ username: loginCredentials.username })
    .expect(400)
    .expect('Content-Type', /application\/json/)

  const { body: { token } } = response
  expect(token).toBeUndefined()
}, 10000)

test('An user cannot login if username is not found', async () => {
  const response = await api
    .post('/api/login')
    .send({
      username: 'not_found',
      password: loginCredentials.password
    })
    .expect(401)
    .expect('Content-Type', /application\/json/)

  const { body: { token } } = response
  expect(token).toBeUndefined()
}, 10000)

test('An user cannot login if password is not correct', async () => {
  const response = await api
    .post('/api/login')
    .send({
      username: loginCredentials.username,
      password: 'not_correct'
    })
    .expect(401)
    .expect('Content-Type', /application\/json/)

  const { body: { token } } = response
  expect(token).toBeUndefined()
}, 10000)

afterAll(async () => {
  await disconnectFromMongo()
  server.close()
})
