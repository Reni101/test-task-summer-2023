import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { createAppAsyncThunk } from 'common/utils/create-app-async-thunk'
import { IResponse, vacanciesApi } from 'features/searchVacancies/searchVacancies.api'

export interface IFiltersAndPagination {
  page: number
  maxItems: number
  count: number

  filters: IFilters
}
export interface IFilters {
  published?: number
  keyword?: string | null
  payment_from?: number | ''
  payment_to?: number | ''
  catalogues?: string | null
  no_agreement?: null | number
}

const initialState: IResponse & IFiltersAndPagination = {
  objects: [],
  total: 0,
  page: 0,
  maxItems: 500,
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
      const { page, count } = getState().searchVacancies
      let { no_agreement, payment_to, payment_from, ...filters } =
        getState().searchVacancies.filters

      if (payment_from || payment_to) {
        no_agreement = 1
      }

      const res = await vacanciesApi.getVacancies({
        count,
        page,
        payment_from,
        payment_to,
        no_agreement,
        ...filters
      })
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
      state.page = action.payload
    },
    searchByKeyWord(state, action: PayloadAction<string>) {
      state.filters.keyword = action.payload
    },
    setSearchParams(state, action: PayloadAction<IFilters>) {
      state.filters.catalogues = action.payload.catalogues
      state.filters.payment_from = action.payload.payment_from
      state.filters.payment_to = action.payload.payment_to
      state.filters.keyword = action.payload.keyword
    }
  },
  extraReducers: builder => {
    builder.addCase(getVacancies.fulfilled, (state, action) => {
      state.objects = action.payload.objects
      state.total = action.payload.total
    })
  }
})
export const { changeCurrentPage, searchByKeyWord, setSearchParams } = searchVacanciesSlice.actions
export const searchVacanciesReducer = searchVacanciesSlice.reducer
