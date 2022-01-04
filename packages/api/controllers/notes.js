const express = require('express')
const router = express.Router()
const Note = require('../models/Note')
const User = require('../models/User')
const userExtractor = require('../middlewares/userExtractor')

router.get('/', (request, response, next) => {
  Note.find({})
    .populate('user', {
      username: 1,
      name: 1
    })
    .then(notes => {
      response.json(notes)
    })
    .catch(error => {
      next(error)
    })
})

router.get('/:id', (request, response, next) => {
  const { id } = request.params

  Note.findById(id)
    .then(note => (note ? response.json(note) : response.status(404).end()))
    .catch(err => next(err))
})

router.put('/:id', userExtractor, async (request, response, next) => {
  const { id: noteId } = request.params
  const { userId } = request
  const noteToUpdate = request.body

  const newInfo = {
    content: noteToUpdate.content,
    important: noteToUpdate.important || false
  }

  // Check if the note exists
  const note = await Note.findById(noteId)
  if (!note) return response.status(404).send({ error: 'note not found' })

  // Check if the user is the owner of the note
  if (userId !== note.user._id.toString()) return response.status(401).send({ error: 'unauthorized' })

  // Update the note
  Note.findByIdAndUpdate(noteId, newInfo, { new: true })
    .then(result => response.json(result))
    .catch(err => next(err))
})

router.delete('/:id', userExtractor, async (request, response, next) => {
  const { id: noteId } = request.params
  const { userId } = request

  // Note.findByIdAndRemove(id)
  //   .then((d) => response.status(204).end())
  //   .catch(err => next(err))

  // Check if the note exists
  const note = await Note.findById(noteId)
  if (!note) return response.status(404).send({ error: 'note not found' })

  // Check if the user is the owner of the note
  if (userId !== note.user._id.toString()) return response.status(401).send({ error: 'unauthorized' })

  // Delete the note
  await Note.findByIdAndRemove(noteId)
  response.status(204).end()
})

router.post('/', userExtractor, async (request, response, next) => {
  const { content, important = false } = request.body
  const { userId } = request

  const user = await User.findById(userId)

  if (!content) return response.status(400).json({ error: 'content is required' })
  if (!userId) return response.status(400).json({ error: 'userId is required' })
  if (!user) return response.status(400).json({ error: 'userId is invalid' })

  const newNote = new Note({
    content,
    date: new Date(),
    important,
    user: user._id
  })

  // newNote
  //   .save()
  //   .then(savedNote => response.status(200).json(savedNote))
  //   .catch(err => next(err))

  try {
    const savedNote = await newNote.save()
    user.notes = user.notes.concat(savedNote._id)
    await user.save()
    response.status(201).json(savedNote)
  } catch (error) {
    // console.error(error)
    next(error)
  }
})

module.exports = router
