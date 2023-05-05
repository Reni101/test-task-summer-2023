import { IVacancy } from 'features/searchVacancies/searchVacancies.api'

export const toggleVacancyInLS = (key: string, vacancy: IVacancy) => {
  let vacancyArrLS = (JSON.parse(localStorage.getItem(key)!) || []) as IVacancy[]
  let index = vacancyArrLS.findIndex(o => {
    return JSON.stringify(o) === JSON.stringify(vacancy)
  })

  if (index >= 0) {
    vacancyArrLS.splice(index, 1)
  } else {
    vacancyArrLS.push(vacancy)
  }

  localStorage.setItem(key, JSON.stringify(vacancyArrLS))
}
