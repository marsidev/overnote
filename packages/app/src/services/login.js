import axios from 'axios'

// const herokuBaseUrl = 'https://radiant-mountain-30055.herokuapp.comm'
// const baseUrl = `${herokuBaseUrl}/api/login`
const baseUrl = '/api/login'

const login = async credentials => {
  const { data } = await axios.post(baseUrl, credentials)
  return data
}

export default { login }
