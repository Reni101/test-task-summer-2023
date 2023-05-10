import axios from 'axios'

export const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    'x-secret-key': process.env.REACT_APP_SECRET_KEY,
    'X-Api-App-Id': process.env.REACT_APP_APP_ID
  }
})
