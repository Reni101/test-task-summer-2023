import axios from 'axios'
import { AuthResponseType } from 'features/auth/auth.api'

export const instance = axios.create({
  baseURL: 'https://startup-summer-2023-proxy.onrender.com/2.0/',
  headers: {
    'x-secret-key': 'GEU4nvd3rej*jeh.eqp',
    'X-Api-App-Id':
      'v3.r.137440105.ffdbab114f92b821eac4e21f485343924a773131.06c3bdbb8446aeb91c35b80c42ff69eb9c457948'
  }
})

instance.interceptors.request.use(
  request => {
    const accessData = localStorage.getItem('accessData')
    if (accessData) {
      const data = JSON.parse(accessData) as AuthResponseType
      request.headers.Authorization = `${data.token_type} ${data.access_token}`
    }
    return request
  },
  error => {
    return Promise.reject(error)
  }
)
