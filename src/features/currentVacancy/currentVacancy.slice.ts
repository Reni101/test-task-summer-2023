import { createSlice } from '@reduxjs/toolkit'
import { createAppAsyncThunk } from 'common/utils/create-app-async-thunk'
import { currentVacanciesApi } from 'features/currentVacancy/currentVacancies.api'
import { IVacancy } from 'features/searchVacancies/searchVacancies.api'

export const getCurrentVacancy = createAppAsyncThunk<IVacancy, string>(
  'currentVacancySlice/getCurrentVacancy',
  async (id, { rejectWithValue }) => {
    try {
      const res = await currentVacanciesApi.getVacancy(id)
      return res.data
    } catch (e) {
      return rejectWithValue(e)
    }
  }
)

const initialState = {
  vacancy: {} as IVacancy
}

const currentVacancySlice = createSlice({
  name: 'currentVacancySlice',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getCurrentVacancy.fulfilled, (state, action) => {
      state.vacancy = action.payload
    })
  }
})

export const currentVacancyReducer = currentVacancySlice.reducer
