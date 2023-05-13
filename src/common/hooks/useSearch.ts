import { SEARCH_PARAMS } from 'common/enums/SEARCHPARAMS'
import { useSearchParams } from 'react-router-dom'
import { emptyInput, firstPage } from 'common/constant/constant'
import { useAppDispatch, useAppSelector } from 'common/hooks/useAppHooks'
import {
  selectCatalog,
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

  const categoryState = useAppSelector(selectCatalog)
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
    const paramsArray: Array<[string, string]> = []

    searchParams.forEach((value, key) => paramsArray.push([key, value]))

    const urlParams: Partial<IFilters> = paramsArray.reduce((acc, [key, value]) => {
      // @ts-ignore
      acc[key] = value
      return acc
    }, {})

    delete urlParams.page
    if (urlParams.payment_from) {
      urlParams.payment_from = Number(urlParams.payment_from)
    }
    if (urlParams.payment_to) {
      urlParams.payment_to = Number(urlParams.payment_to)
    }

    dispatch(
      setSearchQueryParams({
        page: page - 1,
        keyword: null,
        payment_from: null,
        payment_to: null,
        catalogues: null,
        ...urlParams
      })
    )
    //synchronization of url and redax

    setQueryParams(page, SEARCH_PARAMS.PAGE)
    dispatch(getVacancies())
  }

  return {
    setSearch,
    setSearchParams,
    setPage,
    keywordState,
    payment_fromState,
    payment_toState,
    categoryState
  }
}
