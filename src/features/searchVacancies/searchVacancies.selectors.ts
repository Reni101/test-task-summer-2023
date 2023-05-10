import { RootState } from 'app/store'
import { createSelector } from '@reduxjs/toolkit'

export const selectFilters = (state: RootState) => state.searchVacancies.filters

export const selectKeyWord = (state: RootState) => state.searchVacancies.filters.keyword

export const selectVacancies = (state: RootState) => state.searchVacancies.objects

export const selectTotal = (state: RootState) => state.searchVacancies.total

const pageCount = (state: RootState) => state.searchVacancies.count

export const selectTotalPage = createSelector(selectTotal, pageCount, (total, pageCount) => {
  const maxItems = 500
  return Math.ceil(total ?? 0 > maxItems ? maxItems / pageCount : total ?? 0 / pageCount)
})
