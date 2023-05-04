import { createSlice } from '@reduxjs/toolkit'
import { createAppAsyncThunk } from 'common/utils/create-app-async-thunk'
import { catalogsApi, CatalogType } from 'features/searchVacancies/Filters/catalogs.api'

export const getCatalogs = createAppAsyncThunk(
  'catalogs/getCatalogs',
  async (_, { rejectWithValue }) => {
    try {
      const res = await catalogsApi.getCatalogs()
      return res.data
    } catch (e) {
      return rejectWithValue(e)
    }
  }
)

const catalogsSlice = createSlice({
  name: 'catalogs',
  initialState: [] as CatalogType[],
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getCatalogs.fulfilled, (state, action) => {
      return action.payload
    })
  }
})

export const catalogsReducer = catalogsSlice.reducer
