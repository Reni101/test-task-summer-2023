import { authInstance } from 'common/instance/instance'

export class AuthApi {
  static authByPassword() {
    return authInstance.get<AuthType>('password', {
      params: {
        login: process.env.REACT_APP_LOGIN,
        password: process.env.REACT_APP_PASSWORD,
        client_id: process.env.REACT_APP_CLIENT_ID,
        client_secret: process.env.REACT_APP_APP_ID,
        hr: process.env.REACT_APP_HR
      }
    })
  }

  static refreshToken(token: string) {
    return authInstance.get<AuthType>('refresh_token', {
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
