import { useAppSelector } from 'common/hooks/hooks'
import { VacancyItem } from 'common/components/VacancyItem/VacancyItem'
import styles from 'features/searchVacancies/Vacancies/Vacancies.module.css'
import { selectTotal, selectVacancies } from 'features/searchVacancies/searchVacancies.selectors'
import { Navigate } from 'react-router-dom'
import { PATH } from 'common/enums/PATH'

export const Vacancies = () => {
  const vacancies = useAppSelector(selectVacancies)
  const total = useAppSelector(selectTotal)

  if (total === 0) {
    return <Navigate to={PATH.EMPTY} />
  }

  return (
    <div className={styles.vacancies}>
      {vacancies?.map(vacancy => {
        return <VacancyItem vacancy={vacancy} key={vacancy.id} isCurrentVacancy={false} />
      })}
    </div>
  )
}
