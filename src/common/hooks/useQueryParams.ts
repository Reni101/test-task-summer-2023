import { useSearchParams } from 'react-router-dom'
import { emptyInput, firstPage } from 'common/constant/constant'

export const useQueryParams = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const setQueryParams = (value: string | number | null, key: string) => {
    if (value !== null && value !== firstPage && value !== emptyInput) {
      searchParams.set(key, value.toString())
    } else {
      searchParams.delete(key)
    }
    setSearchParams(searchParams)
  }
  return { setQueryParams, setSearchParams }
}
//add/remove parameters from url
