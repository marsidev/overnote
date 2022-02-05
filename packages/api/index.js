require('dotenv').config()
const { connectToMongo } = require('./middlewares/mongoose')

const express = require('express')
const app = express()
const cors = require('cors')
const morgan = require('morgan')

const notFound = require('./middlewares/notFound')
const handleErrors = require('./middlewares/handleErrors')
const { sentryInit, sentryErrorHandler, sentryRequestHandler, sentryTracingHandler } = require('./middlewares/sentry')

const notesRouter = require('./controllers/notes')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')

// CORS and config
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

// static files
app.use(express.static('../app/build'))
app.use('/static', express.static('assets'))

// Sentry
if (process.env.NODE_ENV !== 'test') {
  app.use(sentryInit)
  app.use(sentryRequestHandler)
  app.use(sentryTracingHandler)
}

// Connect to MongoDB
connectToMongo()

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
if (process.env.NODE_ENV !== 'test') app.use(sentryErrorHandler)
app.use(handleErrors)

// Start server
const PORT = process.env.PORT || 8888
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

module.exports = { app, server }
