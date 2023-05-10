import { instance } from 'common/api/instance'

export const authApi = {
  authByPassword() {
    return instance.get<AuthType>('oauth2/password', {
      params: {
        login: process.env.REACT_APP_LOGIN,
        password: process.env.REACT_APP_PASSWORD,
        client_id: process.env.REACT_APP_CLIENT_ID,
        client_secret: process.env.REACT_APP_APP_ID,
        hr: process.env.REACT_APP_HR
      }
    })
  },
  refreshToken(token: string) {
    return instance.get<AuthType>('oauth2/refresh_token', {
      params: {
        client_id: process.env.REACT_APP_CLIENT_ID,
        client_secret: process.env.REACT_APP_APP_ID,
        refresh_token: token
      }
    })
  }
}

export type AuthType = {
  access_token: string
  refresh_token: string
  ttl: number
  token_type: string
  expires_in: number
}
