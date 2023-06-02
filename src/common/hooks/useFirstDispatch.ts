import { useEffect, useRef } from 'react'
import { setSearchQueryParams } from 'features/searchVacancies/searchVacancies.slice'
import { useAppDispatch } from 'common/hooks/useAppHooks'
import { useGetParams } from 'common/hooks/useGetParams'

export const useFirstDispatch = () => {
  const dispatch = useAppDispatch()
  const { paramsUrl, resetFilters } = useGetParams()
  const isFirstDispatch = useRef(true)

  useEffect(() => {
    if (isFirstDispatch.current) {
      paramsUrl.page ? (paramsUrl.page = +paramsUrl.page - 1) : (paramsUrl.page = null)

      dispatch(setSearchQueryParams({ ...resetFilters, ...paramsUrl }))
    }
    isFirstDispatch.current = false
  }, [])

  return { isFirstDispatch }
}
// on the first render, dispatch from url to state without double requests
