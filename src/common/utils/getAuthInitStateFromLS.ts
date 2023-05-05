import { AuthResponseType } from 'features/auth/auth.api'

export const getAuthInitStateFromLS = (key: string, initState: AuthResponseType) => {
  try {
    const accessData = localStorage.getItem(key)
    if (accessData) {
      return JSON.parse(accessData) as AuthResponseType
    } else {
      return initState
    }
  } catch (e) {
    return initState
  }
}
