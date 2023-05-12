import { RootState } from 'app/store'
import { createSelector } from '@reduxjs/toolkit'

export const selectStatus = (state: RootState) => state.app.status
export const selectError = (state: RootState) => state.app.error
export const selectIsInitialized = (state: RootState) => state.app.isInitialized

export const selectIsLoading = createSelector(selectStatus, status => {
  return status === 'loading'
})
