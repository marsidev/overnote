import axios from 'axios'

// const API_URL = process.env.REACT_APP_API_URL
// const API_URL = process.env.REACT_APP_API_URL_LOCAL
const baseUrl = '/api/notes'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  const request = axios.get(baseUrl)
  const response = await request
  return response.data
}

const create = async newObject => {
  const config = {
    headers: {
      Authorization: token
    }
  }

  const request = axios.post(baseUrl, newObject, config)
  const response = await request
  return response.data
}

const update = async (id, newObject) => {
  const config = {
    headers: {
      Authorization: token
    }
  }

  const request = axios.put(`${baseUrl}/${id}`, newObject, config)
  const response = await request
  return response.data
}

const deleteNote = async (id) => {
  const config = {
    headers: {
      Authorization: token
    }
  }

  const request = axios.delete(`${baseUrl}/${id}`, config)
  const response = await request
  return response.data
}

export default { getAll, create, update, deleteNote, setToken }
