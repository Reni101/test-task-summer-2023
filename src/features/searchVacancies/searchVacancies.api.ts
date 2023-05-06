import { instance } from 'common/api/instance'
import { IFilters } from 'features/searchVacancies/searchVacancies.slice'
import { AuthType } from 'features/auth/auth.api'

export const vacanciesApi = {
  getVacancies(params: { count: number; page: number } & Partial<IFilters>, data: AuthType) {
    return instance.get<IResponse>('/vacancies', {
      params,
      headers: {
        Authorization: `${data.token_type} ${data.access_token}`
      }
    })
  }
}
export interface Positions {
  id: number
  title: string
  key: number
}

export interface Catalogues {
  id: number
  title: string
  key: number
  positions: Positions[]
}

export interface IVacancy {
  canEdit: boolean
  is_closed: boolean
  id: number
  id_client: number
  catalogues: Catalogues[]
  payment_from: number
  payment_to: number
  profession: string
  currency: string
  type_of_work?: {
    id: number
    title: string
  }
  town: {
    id: number
    title: string
    declension: string
    hasMetro: boolean
    genitive: string
  }
  firm_name: string
  vacancyRichText: string
}

export interface IResponse {
  objects: IVacancy[]
  total: number | null
}
