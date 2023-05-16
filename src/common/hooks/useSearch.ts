import { SEARCH_PARAMS } from 'common/enums/SEARCHPARAMS'
import { useSearchParams } from 'react-router-dom'
import { emptyInput, firstPage } from 'common/constant/constant'
import { useAppDispatch, useAppSelector } from 'common/hooks/useAppHooks'
import {
  selectCategory,
  selectKeyWord,
  selectPaymentFrom,
  selectPaymentTo
} from 'features/searchVacancies/searchVacancies.selectors'
import {
  getVacancies,
  IFilters,
  setSearchQueryParams
} from 'features/searchVacancies/searchVacancies.slice'

export const useSearch = () => {
  const dispatch = useAppDispatch()
  const [searchParams, setSearchParams] = useSearchParams()

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
    const paramsUrl: any = {} as Partial<IFilters>

    searchParams.forEach((value, key) => {
      paramsUrl[key] = value
    })

    delete paramsUrl.page
    paramsUrl.payment_from && (paramsUrl.payment_from = +paramsUrl.payment_from)
    paramsUrl.payment_to && (paramsUrl.payment_to = +paramsUrl.payment_to)

    dispatch(
      setSearchQueryParams({
        page: page - 1,
        keyword: null,
        payment_from: null,
        payment_to: null,
        catalogues: null,
        ...paramsUrl
      })
    )
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
