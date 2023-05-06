import axios from 'axios'

export const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    'x-secret-key': 'GEU4nvd3rej*jeh.eqp',
    'X-Api-App-Id':
      'v3.r.137440105.ffdbab114f92b821eac4e21f485343924a773131.06c3bdbb8446aeb91c35b80c42ff69eb9c457948'
  }
})
