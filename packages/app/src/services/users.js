import axios from 'axios'

// const herokuBaseUrl = 'https://radiant-mountain-30055.herokuapp.comm'
// const baseUrl = `${herokuBaseUrl}/api/users`
const baseUrl = '/api/users'

const register = async credentials => {
  const { data } = await axios.post(`${baseUrl}`, credentials)
  return data
}

const validate = async id => {
  const { data } = await axios.get(`${baseUrl}/validate/${id}`)
  return data
}

export default { register, validate }
