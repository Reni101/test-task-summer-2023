import { instance } from 'common/instance/instance'
import { IFilters } from 'features/searchVacancies/searchVacancies.slice'

export class VacanciesApi {
  static getVacancies(params: { count: number; page: number | null } & Partial<IFilters>) {
    return instance.get<IResponse>('vacancies', { params })
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
  }
  firm_name: string
  vacancyRichText: string
}

export interface IResponse {
  objects: IVacancy[]
  total: number | null
}
