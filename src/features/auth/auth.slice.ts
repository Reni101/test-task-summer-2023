import { createSlice } from '@reduxjs/toolkit'
import { createAppAsyncThunk } from 'common/utils/create-app-async-thunk'
import { authApi, AuthResponseType } from 'features/auth/auth.api'
import { setInitialized } from 'app/app.slice'
import { localStorageKeys } from 'common/enums/localStorageKeys'

export const authAndRefresh = createAppAsyncThunk(
  'auth/authAndRefresh',
  async (_, { dispatch, rejectWithValue, getState }) => {
    try {
      const accessData = getState().auth
      if (!accessData.access_token) {
        debugger
        const res = await authApi.authByPassword()
        localStorage.setItem(localStorageKeys.ACCESS_DATA, JSON.stringify(res.data))
        return res.data
      } else if (accessData.ttl * 1000 < Date.now()) {
        const res = await authApi.refreshToken(accessData.refresh_token)
        localStorage.setItem(localStorageKeys.ACCESS_DATA, JSON.stringify(res.data))
        return res.data
      } else {
        return
      }
    } catch (e) {
      return rejectWithValue(e)
    } finally {
      dispatch(setInitialized(true))
    }
  }
)
const initState: AuthResponseType = {
  access_token: '',
  refresh_token: '',
  ttl: 0,
  token_type: '',
  expires_in: 0
}

const authSlice = createSlice({
  name: 'auth',
  initialState: initState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(authAndRefresh.fulfilled, (state, action) => {
      return action.payload
    })
  }
})

//getAuthInitStateFromLS(localStorageKeys.ACCESS_DATA, initState)
export const authReducer = authSlice.reducer
