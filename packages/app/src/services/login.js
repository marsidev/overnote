import axios from 'axios'

// const API_URL = process.env.REACT_APP_API_URL
// const API_URL = process.env.REACT_APP_API_URL_LOCAL
const baseUrl = '/api/login'

const login = async credentials => {
  const { data } = await axios.post(baseUrl, credentials)
  return data
}

export default { login }
