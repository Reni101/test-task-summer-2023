import { IFilters } from 'features/searchVacancies/searchVacancies.slice'
import { useSearchParams } from 'react-router-dom'

export const useGetParams = () => {
  const resetFilters = {
    keyword: null,
    payment_from: null,
    payment_to: null,
    catalogues: null
  }

  const [searchParams, setSearchParams] = useSearchParams()

  const paramsUrl: any = {} as Partial<IFilters>

  searchParams.forEach((value, key) => {
    paramsUrl[key] = value
  })

  paramsUrl.payment_from && (paramsUrl.payment_from = +paramsUrl.payment_from)
  paramsUrl.payment_to && (paramsUrl.payment_to = +paramsUrl.payment_to)

  return { paramsUrl, searchParams, setSearchParams, resetFilters }
}
