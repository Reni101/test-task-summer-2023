import { useSearchParams } from 'react-router-dom'
import { SEARCH_PARAMS } from 'common/enums/SEARCHPARAMS'

export const useQueryParams = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const getQueryParams = (key: SEARCH_PARAMS) => {
    let queryParam
    if (key === SEARCH_PARAMS.CATALOGUES || key === SEARCH_PARAMS.KEYWORD) {
      queryParam = searchParams.get(key)
    } else {
      queryParam = searchParams.get(key) ? Number(searchParams.get(key)) : ''
    }
    return queryParam
  }

  const setQueryParams = (value: string | number | null, key: string) => {
    if (value !== null && value !== 1 && value !== '') {
      searchParams.set(key, value.toString())
    } else {
      searchParams.delete(key)
    }
    setSearchParams(searchParams)
  }
  return { getQueryParams, setQueryParams, setSearchParams }
}
