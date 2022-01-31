import axios from 'axios'

// const herokuBaseUrl = 'https://young-dawn-98726.herokuapp.com'
// const baseUrl = `${herokuBaseUrl}/api/login`
const baseUrl = '/api/login'

const login = async credentials => {
  const { data } = await axios.post(baseUrl, credentials)
  return data
}

export default { login }
