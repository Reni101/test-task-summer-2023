import { useEffect, useRef } from 'react'
import { SEARCH_PARAMS } from 'common/enums/SEARCHPARAMS'
import {
  changeCurrentPage,
  IFilters,
  setSearchQueryParams
} from 'features/searchVacancies/searchVacancies.slice'
import { useAppDispatch, useAppSelector } from 'common/hooks/hooks'
import {
  selectCurrentPage,
  selectFilters
} from 'features/searchVacancies/searchVacancies.selectors'
import { useSearchParams } from 'react-router-dom'

export const useFirstDispatch = () => {
  const dispatch = useAppDispatch()
  const filters = useAppSelector(selectFilters)
  const currentPage = useAppSelector(selectCurrentPage)

  const isFirstRender = useRef(true)
  const isFirstDispatch = useRef(true)

  const [searchParams] = useSearchParams()

  useEffect(() => {
    if (!isFirstRender.current) {
      isFirstDispatch.current = false
    }
  }, [filters, currentPage])

  useEffect(() => {
    if (isFirstRender.current) {
      const keyWordQuery = searchParams.get(SEARCH_PARAMS.KEYWORD) ?? null // string
      const cataloguesQuery = searchParams.get(SEARCH_PARAMS.CATALOGUES) ?? null // string
      const payment_fromQuery = searchParams.get(SEARCH_PARAMS.PAYMENT_FROM) //+
      const payment_toQuery = searchParams.get(SEARCH_PARAMS.PAYMENT_TO) // +
      const pageQuery = searchParams.get(SEARCH_PARAMS.PAGE) ?? 1 // +

      const params: Partial<IFilters> = {
        keyword: keyWordQuery,
        payment_from: payment_fromQuery ? +payment_fromQuery : null,
        payment_to: payment_toQuery ? +payment_toQuery : null,
        catalogues: cataloguesQuery
      }
      dispatch(setSearchQueryParams(params))
      dispatch(changeCurrentPage(+pageQuery))
      isFirstRender.current = false
    }
  }, [])

  return { isFirstDispatch, filters, currentPage }
}
