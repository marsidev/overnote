const jwt = require('jsonwebtoken')

module.exports = (request, response, next) => {
  const secret = process.env.JWT_SECRET
  const authorization = request.get('authorization')
  let token = ''

  if (!secret) return response.status(500).json({ error: 'secret key was not found' })
  if (!authorization) return response.status(401).json({ error: 'token missing or invalid' })

  if (authorization && authorization.toLowerCase().startsWith('bearer')) {
    token = authorization.substring(7)
  }

  const decodedToken = jwt.verify(token, secret)

  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const { id: userId } = decodedToken

  request.userId = userId

  next()
}
