require('dotenv').config()
const { connectToMongo } = require('./middlewares/mongoose')

const express = require('express')
const app = express()
const cors = require('cors')

const notFound = require('./middlewares/notFound')
const handleErrors = require('./middlewares/handleErrors')
const { sentryInit, sentryErrorHandler, sentryRequestHandler, sentryTracingHandler } = require('./middlewares/sentry')

const notesRouter = require('./controllers/notes')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')

// CORS and config
app.use(cors())
app.use(express.json())
// app.use('/images', express.static('images'))
app.use(express.static('../app/build'))

// Sentry
app.use(sentryInit)
app.use(sentryRequestHandler)
app.use(sentryTracingHandler)

// Connect to MongoDB
connectToMongo() // bad practice ?

// Root path
app.get('/', (request, response) => {
  response.send('<h1>Hello Unicorn! 🦄</h1>')
})

// Routing
app.use('/api/notes', notesRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/testing')
  app.use('/api/testing', testingRouter)
}

// Error handling
app.use(notFound)
app.use(sentryErrorHandler)
app.use(handleErrors)

// Start server
const PORT = process.env.PORT || 3001
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

module.exports = { app, server }
