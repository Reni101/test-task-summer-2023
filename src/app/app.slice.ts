import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const slice = createSlice({
  name: 'counter',
  initialState: {
    status: 'idle' as RequestStatusType,
    error: null as string | null,
    isInitialized: false as boolean
  },
  reducers: {
    setInitialized(state, action: PayloadAction<boolean>) {
      state.isInitialized = action.payload
    }
  },
  extraReducers: builder =>
    builder
      .addMatcher(
        action => {
          return action.type.endsWith('/pending')
        },
        state => {
          state.status = 'loading'
        }
      )
      .addMatcher(
        action => action.type.endsWith('/fulfilled'),
        state => {
          state.status = 'succeeded'
        }
      )
      .addMatcher(
        action => action.type.endsWith('/rejected'),
        (state, action) => {
          if (action.payload.response) {
            debugger
            state.error = action.payload.response.data.error.message
          } else {
            debugger
            state.error = action.payload.message
          }
          state.status = 'failed'
        }
      )
})

export const { setInitialized } = slice.actions
export const appReducer = slice.reducer
