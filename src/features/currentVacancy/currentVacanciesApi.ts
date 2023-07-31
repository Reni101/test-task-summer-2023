import { instance } from 'common/instance/instance'
import { IVacancy } from 'features/searchVacancies/searchVacancies.api'

export class CurrentVacanciesApi {
  static getVacancy(id: string) {
    return instance.get<IVacancy>(`/vacancies/${id}`)
  }
}
