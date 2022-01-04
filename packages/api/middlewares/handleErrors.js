const ERROR_HANDLERS = {
  CastError: res =>
    res.status(400).send({ error: 'id used is malformed' }),

  ValidationError: (res, { message }) =>
    res.status(409).send({ error: message }),

  JsonWebTokenError: (res) =>
    res.status(401).json({ error: 'token missing or invalid' }),

  TokenExpirerError: res =>
    res.status(401).json({ error: 'token expired' }),

  MongoServerError: (res, error) => {
    // console.error(error.name)
    // console.error(error.code)
    // console.error(error)
    if (error.code === 11000) {
      return res.status(409).send({ error: 'username already exists' })
    } else {
      res.status(500).json({ error: 'mongo server error' })
    }
  },

  defaultError: (res, error) => {
    console.log({
      error: error.message,
      name: error.name,
      stack: error.stack,
      code: error.code
    })
    // console.error(error)
    res.status(500).end()
  }
}

module.exports = (error, request, response, next) => {
  console.log('I am on the handleErrors middleware 😢')
  const handler = ERROR_HANDLERS[error.name] || ERROR_HANDLERS.defaultError
  handler(response, error)
}
