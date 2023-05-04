import { instanceAuth } from 'common/api/instance.auth'

export const authApi = {
  authByPassword() {
    return instanceAuth.get<AuthResponseType>('password', {
      params: {
        login: 'sergei.stralenia@gmail.com',
        password: 'paralect123',
        client_id: '2356',
        client_secret:
          'v3.r.137440105.ffdbab114f92b821eac4e21f485343924a773131.06c3bdbb8446aeb91c35b80c42ff69eb9c457948',
        hr: 0
      }
    })
  },
  refreshToken(token: string) {
    return instanceAuth.get<Omit<AuthResponseType, 'reg_user_resumes_count'>>('refresh_token', {
      params: {
        client_id: '2356',
        client_secret:
          'v3.r.137440105.ffdbab114f92b821eac4e21f485343924a773131.06c3bdbb8446aeb91c35b80c42ff69eb9c457948',
        refresh_token: token
      }
    })
  }
}

export type AuthResponseType = {
  access_token: string
  refresh_token: string
  ttl: number
  token_type: string
  expires_in: number
  reg_user_resumes_count: number
}
