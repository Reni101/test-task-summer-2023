import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IVacancy } from 'features/searchVacancies/searchVacancies.api'

const favoriteSlice = createSlice({
  name: 'favorite',
  initialState: [] as IVacancy[],
  reducers: {
    toggleFavorite(state, action: PayloadAction<IVacancy>) {
      const index = state.findIndex(el => el.id === action.payload.id)
      if (index > -1) {
        state.splice(index, 1)
      } else {
        state.push(action.payload)
      }
    }
  }
})

export const { toggleFavorite } = favoriteSlice.actions
export const favoriteReducer = favoriteSlice.reducer
