import { SEARCH_PARAMS } from 'common/enums/SEARCHPARAMS'
import { emptyInput, firstPage } from 'common/constant/constant'
import { useAppDispatch, useAppSelector } from 'common/hooks/useAppHooks'
import {
  selectCategory,
  selectKeyWord,
  selectPaymentFrom,
  selectPaymentTo
} from 'features/searchVacancies/searchVacancies.selectors'
import { getVacancies, setSearchQueryParams } from 'features/searchVacancies/searchVacancies.slice'
import { useGetParams } from 'common/hooks/useGetParams'

export const useSearch = () => {
  const dispatch = useAppDispatch()
  const { paramsUrl, setSearchParams, searchParams, resetFilters } = useGetParams()

  const categoryState = useAppSelector(selectCategory)
  const payment_fromState = useAppSelector(selectPaymentFrom)
  const payment_toState = useAppSelector(selectPaymentTo)
  const keywordState = useAppSelector(selectKeyWord)

  const setQueryParams = (value: string | number | null, key: string) => {
    if (value !== null && value !== firstPage && value !== emptyInput) {
      searchParams.set(key, value.toString())
    } else {
      searchParams.delete(key)
    }
    setSearchParams(searchParams)
  }

  const setSearch = () => {
    setQueryParams(categoryState, SEARCH_PARAMS.CATALOGUES)
    setQueryParams(payment_fromState, SEARCH_PARAMS.PAYMENT_FROM)
    setQueryParams(payment_toState, SEARCH_PARAMS.PAYMENT_TO)
    setQueryParams(keywordState, SEARCH_PARAMS.KEYWORD)

    setQueryParams(null, SEARCH_PARAMS.PAGE)
    dispatch(setSearchQueryParams({ page: null }))

    dispatch(getVacancies())
  }

  const setPage = (page: number) => {
    delete paramsUrl.page

    dispatch(setSearchQueryParams({ page: page - 1, ...resetFilters, ...paramsUrl }))

    //synchronization of url and redux

    setQueryParams(page, SEARCH_PARAMS.PAGE)
    dispatch(getVacancies())
  }

  return {
    setSearch,
    setPage,
    keywordState,
    payment_fromState,
    payment_toState,
    categoryState
  }
}
