import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const slice = createSlice({
  name: 'app',
  initialState: {
    status: 'idle' as RequestStatusType,
    error: null as string | null,
    isInitialized: false as boolean
  },
  reducers: {
    setInitialized(state, action: PayloadAction<boolean>) {
      state.isInitialized = action.payload
    },
    clearError(state) {
      state.error = null
    }
  },
  extraReducers: builder =>
    builder
      .addMatcher(
        action => {
          if (action.type.endsWith('authAndRefresh/pending')) return false
          return action.type.endsWith('/pending')
        },
        state => {
          state.status = 'loading'
        }
      )
      .addMatcher(
        action => {
          if (action.type.endsWith('authAndRefresh/fulfilled')) return false
          return action.type.endsWith('/fulfilled')
        },
        state => {
          state.status = 'succeeded'
        }
      )
      .addMatcher(
        action => action.type.endsWith('/rejected'),
        (state, action) => {
          if (action.payload.response?.data.error) {
            state.error = action.payload.response.data.error.message
          } else {
            state.error = action.payload.message
          }
          state.status = 'failed'
        }
      )
})

export const { setInitialized, clearError } = slice.actions
export const appReducer = slice.reducer
