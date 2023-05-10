import { instance } from 'common/api/instance'
import { IVacancy } from 'features/searchVacancies/searchVacancies.api'

export const currentVacanciesApi = {
  getVacancy(id: string) {
    return instance.get<IVacancy>(`/vacancies/${id}`).then(res => res.data)
  }
}
