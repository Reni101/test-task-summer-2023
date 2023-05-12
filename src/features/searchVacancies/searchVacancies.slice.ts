import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { createAppAsyncThunk } from 'common/utils/create-app-async-thunk'
import { IResponse, vacanciesApi } from 'features/searchVacancies/searchVacancies.api'

export interface IFiltersAndPagination {
  page: number | null
  count: number

  filters: IFilters
}
export interface IFilters {
  published: number | null
  no_agreement: null | number

  keyword: string | null
  payment_from: number | null
  payment_to: number | null
  catalogues: string | null
}

const initialState: IResponse & IFiltersAndPagination = {
  objects: [],
  total: null,
  page: 0,
  count: 4,
  filters: {
    published: 1,
    no_agreement: null,

    keyword: null,
    payment_from: null,
    payment_to: null,
    catalogues: null
  }
}

export const getVacancies = createAppAsyncThunk<IResponse, void>(
  'searchVacancies/getVacancies',
  async (_, { rejectWithValue, getState }) => {
    try {
      const accessData = getState().auth
      let { page, count } = getState().searchVacancies
      let { no_agreement, payment_to, payment_from, catalogues, keyword, published } =
        getState().searchVacancies.filters

      if (payment_from || payment_to) no_agreement = 1
      if (page === 0) page = null
      if (keyword === '') keyword = null
      const res = await vacanciesApi.getVacancies(
        {
          count,
          page,
          payment_from,
          payment_to,
          no_agreement,
          catalogues,
          keyword,
          published
        },
        accessData
      )
      return res.data
    } catch (e) {
      return rejectWithValue(e)
    }
  }
)

export const searchVacanciesSlice = createSlice({
  name: 'searchVacancies',
  initialState,

  reducers: {
    changeCurrentPage(state, action: PayloadAction<number>) {
      state.page = action.payload - 1
    },
    setSearchQueryParams(state, action: PayloadAction<Partial<IFilters>>) {
      state.filters = { ...state.filters, ...action.payload }
    },
    resetAllFilters(state) {
      state.filters.keyword = null
      state.filters.payment_from = null
      state.filters.payment_to = null
      state.filters.catalogues = null
      state.page = 0
    },
    setTotal(state, action: PayloadAction<number | null>) {
      state.total = action.payload
    }
  },
  extraReducers: builder => {
    builder.addCase(getVacancies.fulfilled, (state, action) => {
      state.objects = action.payload.objects
      state.total = action.payload.total
    })
  }
})

export const { changeCurrentPage, setSearchQueryParams, resetAllFilters, setTotal } =
  searchVacanciesSlice.actions
export const searchVacanciesReducer = searchVacanciesSlice.reducer
