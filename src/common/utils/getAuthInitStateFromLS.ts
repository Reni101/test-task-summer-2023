import { AuthType } from 'features/auth/auth.api'

export const getAuthInitStateFromLS = (key: string, initState: AuthType) => {
  try {
    const accessData = localStorage.getItem(key)
    if (accessData) {
      return JSON.parse(accessData) as AuthType
    } else {
      return initState
    }
  } catch (e) {
    return initState
  }
}
