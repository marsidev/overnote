import axios from 'axios'

// const herokuBaseUrl = 'https://radiant-mountain-30055.herokuapp.comm'
// const baseUrl = `${herokuBaseUrl}/api/notes`
const baseUrl = '/api/notes'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = async ({ user }) => {
  const config = {
    headers: { Authorization: `Bearer ${user.token}` }
  }
  const response = await axios.get(baseUrl, config)
  return response.data
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async (id, newObject) => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.put(`${baseUrl}/${id}`, newObject, config)
  return response.data
}

const deleteNote = async (id) => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}

export default { getAll, create, update, deleteNote, setToken }
