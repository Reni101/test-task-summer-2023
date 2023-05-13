import { RootState } from 'app/store'
import { createSelector } from '@reduxjs/toolkit'
import { maxItemFromServer } from 'common/constant/constant'

export const selectFilters = (state: RootState) => state.searchVacancies.filters
export const selectPaymentFrom = (state: RootState) => state.searchVacancies.filters.payment_from
export const selectPaymentTo = (state: RootState) => state.searchVacancies.filters.payment_to
export const selectCatalog = (state: RootState) => state.searchVacancies.filters.catalogues

export const selectKeyWord = (state: RootState) => state.searchVacancies.filters.keyword

export const selectVacancies = (state: RootState) => state.searchVacancies.objects

export const selectTotal = (state: RootState) => state.searchVacancies.total

export const pageCount = (state: RootState) => state.searchVacancies.count

export const selectTotalPage = createSelector(selectTotal, pageCount, (total, pageCount) => {
  return Math.ceil(
    (total ?? 0) > maxItemFromServer ? maxItemFromServer / pageCount : (total ?? 0) / pageCount
  )
})

export const selectCurrentPage = (state: RootState) => state.searchVacancies.filters.page
