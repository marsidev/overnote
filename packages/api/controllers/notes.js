const express = require('express')
const crypto = require('crypto')
const router = express.Router()
const Note = require('../models/Note')
const User = require('../models/User')
const userExtractor = require('../middlewares/userExtractor')

router.get('/', userExtractor, async (req, res, next) => {
  try {
    const { userId } = req
    const notes = await Note
      .find({ createdBy: userId })
      .populate('createdBy', { username: 1, name: 1 })
    res.json(notes)
  } catch (error) {
    next(error)
  }
})

router.get('/:id', userExtractor, async (req, res, next) => {
  try {
    const { id } = req.params
    const { userId } = req
    const note = await Note.findOne({ _id: id, user: userId })
    if (!note) return res.status(404).end()
    res.json(note)
  } catch (error) {
    next(error)
  }
})

router.put('/:id', userExtractor, async (req, res, next) => {
  try {
    const { id: noteId } = req.params
    const { userId } = req
    const noteToUpdate = req.body

    const newInfo = {
      title: noteToUpdate.title,
      content: noteToUpdate.content,
      backgroundColor: noteToUpdate.backgroundColor,
      pinned: noteToUpdate.pinned || false
    }

    // Check if the note exists
    const note = await Note.findById(noteId)
    if (!note) return res.status(404).send({ error: 'note not found' })

    // Check if the user is the owner of the note
    if (userId !== note.createdBy) return res.status(401).send({ error: 'unauthorized' })

    // Update the note
    const result = await Note.findByIdAndUpdate(noteId, newInfo, { new: true })
    res.json(result)
  } catch (error) {
    next(error)
  }
})

router.delete('/:id', userExtractor, async (req, res, next) => {
  try {
    const { id: noteId } = req.params
    const { userId } = req

    // Check if the note exists
    const note = await Note.findById(noteId)
    if (!note) return res.status(404).send({ error: 'note not found' })

    // Check if the user is the owner of the note
    if (userId !== note.createdBy) return res.status(401).send({ error: 'unauthorized' })

    const user = await User.findById(userId)

    // Delete the note
    await Note.findByIdAndRemove(noteId)
    user.notes = user.notes.filter(id => id !== noteId)
    await user.save()
    res.status(204).end()
  } catch (error) {
    next(error)
  }
})

router.post('/', userExtractor, async (req, res, next) => {
  try {
    const { title = '', content = '', pinned = false, backgroundColor = 'default', id } = req.body
    const { userId } = req

    const user = await User.findById(userId)

    // if (!content && !title) return res.status(400).json({ error: 'content or title are required' })
    if (!userId) return res.status(400).json({ error: 'userId is required' })
    if (!user) return res.status(400).json({ error: 'user is invalid' })

    // console.log(id)
    const noteId = id || crypto.randomUUID()

    const newNote = new Note({
      _id: noteId,
      content,
      title,
      pinned,
      backgroundColor,
      createdBy: user._id
    })

    const savedNote = await newNote.save()
    user.notes = [...user.notes, savedNote._id] // user.notes.concat(savedNote._id)
    await user.save()
    res.status(201).json(savedNote)
  } catch (error) {
    next(error)
  }
})

module.exports = router
