import axios from 'axios'
import { AuthType } from 'features/auth/auth.api'
import { persistor } from 'app/store'

const headers = {
  'x-secret-key': process.env.REACT_APP_SECRET_KEY,
  'X-Api-App-Id': process.env.REACT_APP_APP_ID
}

export const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers
})

export const authInstance = axios.create({
  baseURL: `${process.env.REACT_APP_BASE_URL}oauth2/`,
  headers
})

instance.interceptors.request.use(request => {
  try {
    persistor.flush()
    const state = JSON.parse(localStorage.getItem('persist:root')!)
    const authData = JSON.parse(state.auth) as AuthType
    request.headers.Authorization = `${authData.token_type} ${authData.access_token}`
    return request
  } catch {
    return request
  }
})
