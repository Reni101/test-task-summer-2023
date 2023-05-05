import { IVacancy } from 'features/searchVacancies/searchVacancies.api'
import { useState } from 'react'

export const useToggleFavorite = (key: string, vacancy: IVacancy) => {
  let vacancyArrLS = (JSON.parse(localStorage.getItem(key)!) || []) as IVacancy[]
  let index = vacancyArrLS.findIndex(o => {
    return JSON.stringify(o) === JSON.stringify(vacancy)
  })

  const [isFavorite, setIsFavorite] = useState(index >= 0)

  const toggleVacancyHandler = () => {
    if (index >= 0) {
      vacancyArrLS.splice(index, 1)
      setIsFavorite(false)
    } else {
      vacancyArrLS.push(vacancy)
      setIsFavorite(true)
    }
    localStorage.setItem(key, JSON.stringify(vacancyArrLS))
  }

  return { isFavorite, toggleVacancyHandler }
}
