import { createSlice } from '@reduxjs/toolkit'
import { createAppAsyncThunk } from 'common/utils/create-app-async-thunk'
import { currentVacanciesApi } from 'features/currentVacancy/currentVacancies.api'
import { IVacancy } from 'features/searchVacancies/searchVacancies.api'

export const getCurrentVacancy = createAppAsyncThunk<IVacancy, string>(
  'currentVacancySlice/getCurrentVacancy',
  async (id, { rejectWithValue }) => {
    try {
      return await currentVacanciesApi.getVacancy(id)
    } catch (e) {
      return rejectWithValue(e)
    }
  }
)

const currentVacancySlice = createSlice({
  name: 'currentVacancySlice',
  initialState: {} as IVacancy,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getCurrentVacancy.fulfilled, (state, action) => {
      return action.payload
    })
  }
})

export const currentVacancyReducer = currentVacancySlice.reducer
