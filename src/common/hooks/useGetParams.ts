import { IFilters } from 'features/searchVacancies/searchVacancies.slice'
import { useSearchParams } from 'react-router-dom'

export const useGetParams = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const resetFilters = {
    keyword: null,
    payment_from: null,
    payment_to: null,
    catalogues: null
  }

  const paramsUrl: any = {} as Partial<IFilters>

  searchParams.forEach((value, key) => {
    paramsUrl[key] = value
  })

  paramsUrl.payment_from && (paramsUrl.payment_from = +paramsUrl.payment_from)
  paramsUrl.payment_to && (paramsUrl.payment_to = +paramsUrl.payment_to)

  return { paramsUrl, resetFilters, searchParams, setSearchParams }
}
