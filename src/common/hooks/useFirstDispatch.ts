import { useEffect, useRef } from 'react'
import { SEARCH_PARAMS } from 'common/enums/SEARCHPARAMS'
import { IFilters, setSearchQueryParams } from 'features/searchVacancies/searchVacancies.slice'
import { useAppDispatch } from 'common/hooks/hooks'
import { useSearchParams } from 'react-router-dom'

export const useFirstDispatch = () => {
  const dispatch = useAppDispatch()

  const isFirstRender = useRef(true)

  const [searchParams] = useSearchParams()

  useEffect(() => {
    if (isFirstRender.current) {
      const keyWordQuery = searchParams.get(SEARCH_PARAMS.KEYWORD)
      const cataloguesQuery = searchParams.get(SEARCH_PARAMS.CATALOGUES)
      const payment_fromQuery = searchParams.get(SEARCH_PARAMS.PAYMENT_FROM)
      const payment_toQuery = searchParams.get(SEARCH_PARAMS.PAYMENT_TO)
      const pageQuery = searchParams.get(SEARCH_PARAMS.PAGE) ?? 1

      const params: Partial<IFilters> = {
        keyword: keyWordQuery,
        payment_from: payment_fromQuery ? +payment_fromQuery : null,
        payment_to: payment_toQuery ? +payment_toQuery : null,
        catalogues: cataloguesQuery,
        page: +pageQuery - 1
      }
      dispatch(setSearchQueryParams(params))
    }
    isFirstRender.current = false
  }, [])

  return { isFirstRender }
}
// on the first render, dispatch from url to state without double requests
