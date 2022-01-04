const { server } = require('../index')
const { connectToMongo, disconnectFromMongo } = require('../middlewares/mongoose')
const Note = require('../models/note')
const { api, initialUser, initialNotes, temporaryTestToken, getNotes, testPost } = require('./helpers')

describe('NOTES Tests', () => {
  beforeAll(async () => {
    await connectToMongo()
    await Note.deleteMany({})

    const notesToAdd = initialNotes.map(note => ({ ...note, user: initialUser._id }))

    // serial insert
    // for (const note of notesToAdd) {
    //   const noteObject = new Note(note)
    //   await noteObject.save()
    // }

    // parellel insert
    const noteObjects = notesToAdd.map(note => new Note(note))
    await Note.insertMany(noteObjects)
  })

  describe('GET tests', () => {
    test('notes are returned as json', async () => {
      await api
        .get('/api/notes')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    })

    test('notes size is same than initialNotes.length before any insertion', async () => {
      const response = await api.get('/api/notes')
      expect(response.body).toHaveLength(initialNotes.length)
    })

    test('response contains "HTML is easy"', async () => {
      const { contents } = await getNotes('/api/notes')
      expect(contents).toContain('HTML is easy')
    })
  })

  describe('POST tests', () => {
    test('a new note can be aded', async () => {
      const { respBody: firstResponse } = await getNotes('/api/notes')
      const newNote = {
        content: 'async/await simplifies making async calls',
        important: true,
        userId: initialUser._id
      }
      await testPost({
        path: '/api/notes',
        expectedStatusCode: 201,
        payload: newNote,
        headers: { Authorization: `Bearer ${temporaryTestToken}` }
      })
      const { respBody: secondResponse, contents } = await getNotes(
        '/api/notes'
      )
      expect(secondResponse).toHaveLength(firstResponse.length + 1)
      expect(contents).toContain(newNote.content)
    })

    test('a note without content cannot be added', async () => {
      const { respBody: firstResponse } = await getNotes('/api/notes')
      const newNote = { important: true }
      await testPost({
        path: '/api/notes',
        expectedStatusCode: 400,
        payload: newNote,
        headers: { Authorization: `Bearer ${temporaryTestToken}` }
      })
      const { respBody: secondResponse } = await getNotes('/api/notes')
      expect(secondResponse).toHaveLength(firstResponse.length)
    })

    test('a note without auth header cannot be added', async () => {
      const newNote = {
        content: 'async/await simplifies making async calls',
        important: true
      }
      await testPost({
        path: '/api/notes',
        expectedStatusCode: 401,
        payload: newNote,
        headers: {}
      })
    })
  })

  describe('DELETE tests', () => {
    test('a note can be deleted', async () => {
      const { respBody: firstResponse } = await getNotes('/api/notes')
      const noteToDelete = firstResponse[0]

      await api
        .delete(`/api/notes/${noteToDelete.id}`)
        .set({ Authorization: `Bearer ${temporaryTestToken}` })
        .expect(204)

      const { ids, respBody: secondResponse } = await getNotes('/api/notes')
      expect(secondResponse).toHaveLength(firstResponse.length - 1)
      expect(ids).not.toContain(noteToDelete.id)
    })

    test('a note that has an invalid id and cannot be deleted', async () => {
      const { respBody: firstResponse } = await getNotes('/api/notes')

      await api
        .delete('/api/notes/1234')
        .set({ Authorization: `Bearer ${temporaryTestToken}` })
        .expect(400)
        .expect('Content-Type', /application\/json/)

      const { respBody: secondResponse } = await getNotes('/api/notes')
      expect(secondResponse).toHaveLength(firstResponse.length)
    })

    test('a note that has a valid id but do not exist can not be deleted', async () => {
      const { respBody: firstResponse } = await getNotes('/api/notes')
      const testId = '60451827152dc22ad778f442'

      await api
        .delete(`/api/notes/${testId}`)
        .set('Authorization', `Bearer ${temporaryTestToken}`)
        .expect(404)
        .expect('Content-Type', /application\/json/)

      const { respBody: secondResponse } = await getNotes('/api/notes')
      expect(secondResponse).toHaveLength(firstResponse.length)
    })

    test('a note cannot be deleted if authorization header is missing', async () => {
      const { respBody: firstResponse } = await getNotes('/api/notes')
      const noteToDelete = firstResponse[0]

      await api
        .delete(`/api/notes/${noteToDelete.id}`)
        .expect(401)
        .expect('Content-Type', /application\/json/)

      const { ids, respBody: secondResponse } = await getNotes('/api/notes')
      expect(secondResponse).toHaveLength(firstResponse.length)
      expect(ids).toContain(noteToDelete.id)
    })
  })

  describe('PUT/Update tests', () => {
    test('a note can be updated', async () => {
      const { respBody } = await getNotes('/api/notes')
      const noteIdToUpdate = respBody[0].id

      await api
        .put(`/api/notes/${noteIdToUpdate}`)
        .set({ Authorization: `Bearer ${temporaryTestToken}` })
        .send({ content: 'new content' })
        .expect(200)
        .expect('Content-Type', /application\/json/)
    }, 10000)

    test('a note that has an invalid id cannot be updated', async () => {
      await api
        .put('/api/notes/1234')
        .set({ Authorization: `Bearer ${temporaryTestToken}` })
        .send({ content: 'new content' })
        .expect(400)
        .expect('Content-Type', /application\/json/)
    }, 10000)

    test('a note that has a valid id but do not exist can not be updated', async () => {
      const testId = '60451827152dc22ad778f442'
      await api
        .put(`/api/notes/${testId}`)
        .set('Authorization', `Bearer ${temporaryTestToken}`)
        .send({ content: 'new content' })
        .expect(404)
        .expect('Content-Type', /application\/json/)
    }, 10000)

    test('a note cannot be updated if authorization header is missing', async () => {
      const { respBody } = await getNotes('/api/notes')
      const noteIdToUpdate = respBody[0].id

      await api
        .put(`/api/notes/${noteIdToUpdate}`)
        .send({ content: 'new content' })
        .expect(401)
        .expect('Content-Type', /application\/json/)
    }, 10000)
  })

  afterAll(async () => {
    await disconnectFromMongo()
    server.close()
  })
})
