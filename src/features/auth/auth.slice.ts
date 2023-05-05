import { createSlice } from '@reduxjs/toolkit'
import { createAppAsyncThunk } from 'common/utils/create-app-async-thunk'
import { authApi } from 'features/auth/auth.api'
import { setInitialized } from 'app/app.slice'
import { getAuthInitStateFromLS } from 'common/utils/getAuthInitStateFromLS'
import { localStorageKeys } from 'common/enums/localStorageKeys'

export interface IAuthState {
  access_token: string
  refresh_token: string
  ttl: number
  token_type: string
  expires_in: number
}

export const authAndRefresh = createAppAsyncThunk(
  'auth/authAndRefresh',
  async (_, { dispatch, rejectWithValue, getState }) => {
    try {
      const accessData = getState().auth
      if (!accessData.access_token) {
        const res = await authApi.authByPassword()
        localStorage.setItem(localStorageKeys.ACCESS_DATA, JSON.stringify(res.data))
        return res.data
      } else if (accessData.ttl * 1000 < Date.now()) {
        const res = await authApi.refreshToken(accessData.refresh_token)
        localStorage.setItem(localStorageKeys.ACCESS_DATA, JSON.stringify(res.data))
        return res.data
      }
    } catch (e) {
      return rejectWithValue(e)
    } finally {
      dispatch(setInitialized(true))
    }
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState: getAuthInitStateFromLS(localStorageKeys.ACCESS_DATA),
  reducers: {},
  extraReducers: builder => {
    builder.addCase(authAndRefresh.fulfilled, (state, action) => {
      return action.payload
    })
  }
})
export const authReducer = authSlice.reducer
