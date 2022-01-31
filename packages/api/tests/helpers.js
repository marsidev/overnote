const { app } = require('../index')
const supertest = require('supertest')
const api = supertest(app)

const initialNotes = [
  {
    content: 'HTML is easy',
    pinned: true
  },
  {
    content: 'Browser can execute only Javascript',
    pinned: false
  },
  {
    content: 'Node.js is a platform on which Javascript runs',
    pinned: true
  }
]

const initialUser = {
  username: 'first_user',
  name: 'First User',
  passwordHash: '$2b$10$FYIPDSs4dCS5UuBpc.omqexvicxJ2TziT.yTr0s8yhXUWePKPZav6', // new_user
  _id: '61cbd4865f5c46843bad731f',
  notes: []
}

const temporaryTestToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxY2JkNDg2NWY1YzQ2ODQzYmFkNzMxZiIsInVzZXJuYW1lIjoiZmlyc3RfdXNlciIsImlhdCI6MTY0MDgyMTk5NiwiZXhwIjoxNjcyMzU3OTk2fQ.HvlbL96uGnaUVQG0lWxGLp1rhXcZ1QvagX5hlSwCzAY'

const usersToAdd = {
  admin: {
    username: 'admin',
    name: 'Administrator',
    password: 'admin'
  },
  new_user: {
    username: 'new_user',
    name: 'New user',
    password: 'new_user'
  },
  no_username: {
    name: 'No username',
    password: 'no_username'
  },
  no_name: {
    username: 'no_name',
    password: 'no_name'
  },
  no_password: {
    username: 'no_password',
    name: 'No password'
  }
}

const loginCredentials = {
  username: 'first_user',
  password: 'new_user'
}

const getNotes = async path => {
  const response = await api.get(path)
  return {
    contents: response.body.map(note => note.content),
    ids: response.body.map(note => note.id),
    respBody: response.body
  }
}

const getUsers = async () => {
  const response = await api.get('/api/users')
  // return response.body
  return {
    usernames: response.body.map(u => u.username),
    ids: response.body.map(u => u.id),
    respBody: response.body
  }
}

const testPost = async props => {
  const { path, expectedStatusCode, payload, headers } = props
  // if (payload.content === 'async/await simplifies making async calls') {
  //   console.log({ path, expectedStatusCode, payload })
  // }

  const response = await api
    .post(path)
    .send(payload)
    .set(headers)
    .expect(expectedStatusCode)
    .expect('Content-Type', /application\/json/)

  // if (payload.content === 'async/await simplifies making async calls') {
  //   console.log({ body: response.body, statusCode: response.statusCode })
  // }

  return response
}

const testGet = async (path, expectedStatusCode) => {
  const response = await api
    .get(path)
    .expect(expectedStatusCode)
    .expect('Content-Type', /application\/json/)
  return response
}

const getFirstUserId = async () => {
  let users = await api.get('/api/users')
  if (users.body.length === 0) {
    await api.post('/api/users').send(usersToAdd.new_user)
    users = await api.get('/api/users')
  }
  const userId = users.body[0].id
  return userId
}

module.exports = {
  api,
  initialNotes,
  initialUser,
  usersToAdd,
  loginCredentials,
  temporaryTestToken,
  getNotes,
  getUsers,
  testPost,
  testGet,
  getFirstUserId
}
