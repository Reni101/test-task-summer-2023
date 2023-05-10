import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { createAppAsyncThunk } from 'common/utils/create-app-async-thunk'
import { IResponse, vacanciesApi } from 'features/searchVacancies/searchVacancies.api'
import { RootState } from 'app/store'

export interface IFiltersAndPagination {
  page: number | null
  count: number

  filters: IFilters
}
export interface IFilters {
  published: number | null
  keyword: string | null
  payment_from: number | '' | null
  payment_to: number | '' | null
  catalogues: string | null
  no_agreement: null | number
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
    payment_from: '',
    payment_to: '',
    catalogues: null
  }
}

export const getVacancies = createAppAsyncThunk<IResponse, void>(
  'searchVacancies/getVacancies',
  async (_, { rejectWithValue, getState }) => {
    try {
      let { page, count } = getState().searchVacancies
      const accessData = getState().auth

      let { no_agreement, payment_to, payment_from, catalogues, keyword, published } =
        getState().searchVacancies.filters

      if (payment_from || payment_to) {
        no_agreement = 1
      }
      if (payment_from === '') payment_from = null
      if (payment_to === '') payment_to = null
      if (page === 0) page = null

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
    setSearchParams(state, action: PayloadAction<Partial<IFilters>>) {
      state.filters = { ...state.filters, ...action.payload }
    },
    resetAll(state) {
      state.filters.keyword = null
      state.filters.payment_from = ''
      state.filters.payment_to = ''
      state.filters.catalogues = null
      state.page = 0
      state.total = null
    }
  },
  extraReducers: builder => {
    builder.addCase(getVacancies.fulfilled, (state, action) => {
      state.objects = action.payload.objects
      state.total = action.payload.total
    })
  }
})
export const { changeCurrentPage, setSearchParams, resetAll } = searchVacanciesSlice.actions
export const searchVacanciesReducer = searchVacanciesSlice.reducer

const currentPage = (state: RootState) => state.searchVacancies.page

export const selectCurrentPage = createSelector(currentPage, currentPage => {
  return (currentPage ?? 0) + 1
})
