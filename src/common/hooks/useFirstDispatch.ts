import { useEffect, useRef } from 'react'
import { IFilters, setSearchQueryParams } from 'features/searchVacancies/searchVacancies.slice'
import { useAppDispatch } from 'common/hooks/useAppHooks'
import { useSearchParams } from 'react-router-dom'

export const useFirstDispatch = () => {
  const dispatch = useAppDispatch()
  const [searchParams] = useSearchParams()
  const isFirstDispatch = useRef(true)

  useEffect(() => {
    if (isFirstDispatch.current) {
      const paramsUrl: any = {} as Partial<IFilters>
      searchParams.forEach((value, key) => {
        paramsUrl[key] = value
      })

      paramsUrl.page ? (paramsUrl.page = +paramsUrl.page - 1) : (paramsUrl.page = null)
      paramsUrl.payment_from && (paramsUrl.payment_from = +paramsUrl.payment_from)
      paramsUrl.payment_to && (paramsUrl.payment_to = +paramsUrl.payment_to)

      dispatch(
        setSearchQueryParams({
          keyword: null,
          payment_from: null,
          payment_to: null,
          catalogues: null,
          ...paramsUrl
        })
      )
    }
    isFirstDispatch.current = false
  }, [])

  return { isFirstDispatch }
}
// on the first render, dispatch from url to state without double requests
