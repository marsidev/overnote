import axios from 'axios'

// const herokuBaseUrl = 'https://young-dawn-98726.herokuapp.com'
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
