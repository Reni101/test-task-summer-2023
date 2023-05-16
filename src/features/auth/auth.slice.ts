import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { createAppAsyncThunk } from 'common/utils/create-app-async-thunk'
import { authApi, AuthType } from 'features/auth/auth.api'
import { setInitialized } from 'app/app.slice'

export const authAndRefresh = createAppAsyncThunk(
  'auth/authAndRefresh',
  async (_, { dispatch, rejectWithValue, getState }) => {
    try {
      const accessData = getState().auth
      if (!accessData.access_token) {
        const res = await authApi.authByPassword()
        dispatch(setAuthData(res.data))
      } else if (accessData.ttl * 1000 < Date.now()) {
        const res = await authApi.refreshToken(accessData.refresh_token)
        dispatch(setAuthData(res.data))
      }
    } catch (e) {
      return rejectWithValue(e)
    } finally {
      dispatch(setInitialized(true))
    }
  }
)

const initState: AuthType = {
  access_token: '',
  refresh_token: '',
  ttl: 0,
  token_type: '',
  expires_in: 0
}

const authSlice = createSlice({
  name: 'auth',
  initialState: initState,
  reducers: {
    setAuthData(state, action: PayloadAction<AuthType>) {
      state = action.payload
    }
  }
})

export const authReducer = authSlice.reducer
export const { setAuthData } = authSlice.actions
