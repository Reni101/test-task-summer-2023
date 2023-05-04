import { createSlice } from '@reduxjs/toolkit'
import { createAppAsyncThunk } from 'common/utils/create-app-async-thunk'
import { authApi } from 'features/auth/auth.api'
import { setInitialized } from 'app/app.slice'
import { getAuthInitStateFromLS } from 'common/utils/getAuthInitStateFromLS'

export const authAndRefresh = createAppAsyncThunk(
  'auth/authByPassword',
  async (_, { dispatch, rejectWithValue, getState }) => {
    try {
      const accessData = getState().auth
      if (!accessData.access_token) {
        const res = await authApi.authByPassword()
        localStorage.setItem('accessData', JSON.stringify(res.data))
        return res.data
      } else if (accessData.ttl * 1000 < Date.now()) {
        const res = await authApi.refreshToken(accessData.refresh_token)
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

export interface IAuthState {
  access_token: string
  refresh_token: string
  ttl: number
  token_type: string
  expires_in: number
}

const authSlice = createSlice({
  name: 'auth',
  initialState: getAuthInitStateFromLS('accessData') as IAuthState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(authAndRefresh.fulfilled, (state, action) => {
      return action.payload
    })
  }
})
export const authReducer = authSlice.reducer
