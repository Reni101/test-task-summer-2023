import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from 'app/store'

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
        action => action.type.endsWith('/pending'),
        state => {
          state.status = 'loading'
        }
      )
      .addMatcher(
        action => {
          if (action.type.endsWith('authAndRefresh/fulfilled')) {
            return false
          } else {
            return action.type.endsWith('/fulfilled')
          }
        },
        state => {
          state.status = 'succeeded'
        }
      )
      .addMatcher(
        action => action.type.endsWith('/rejected'),
        (state, action) => {
          if (action.payload.response) {
            state.error = action.payload.response.data.error.message
          } else {
            state.error = action.payload.message
          }
          state.status = 'failed'
        }
      )
})

export const { setInitialized } = slice.actions
export const appReducer = slice.reducer

const total = (state: RootState) => state.searchVacancies.total
const pageCount = (state: RootState) => state.searchVacancies.count

export const selectTotalPage = createSelector(total, pageCount, (total, pageCount) => {
  const maxItems = 500
  return Math.ceil(total ?? 0 > maxItems ? maxItems / pageCount : total ?? 0 / pageCount)
})
