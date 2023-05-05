import { IAuthState } from 'features/auth/auth.slice'

//accessData
export const getAuthInitStateFromLS = (key: string) => {
  const initState: IAuthState = {
    access_token: '',
    refresh_token: '',
    ttl: 0,
    token_type: '',
    expires_in: 0
  }

  try {
    const accessData = localStorage.getItem(key)
    if (accessData) {
      return JSON.parse(accessData) as IAuthState
    } else {
      return initState
    }
  } catch (e) {
    return initState
  }
}
