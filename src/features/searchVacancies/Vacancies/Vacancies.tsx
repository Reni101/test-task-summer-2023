import { useAppDispatch, useAppSelector } from 'common/hooks/hooks'
import { VacancyItem } from 'common/components/VacancyItem/VacancyItem'
import { Navigate } from 'react-router-dom'
import { useEffect } from 'react'
import { resetAll } from 'features/searchVacancies/searchVacancies.slice'
import styles from 'features/searchVacancies/Vacancies/Vacancies.module.css'
import { selectTotal, selectVacancies } from 'features/searchVacancies/searchVacancies.selectors'
import { PATH } from 'common/enums/PATH'

export const Vacancies = () => {
  const dispatch = useAppDispatch()
  const vacancies = useAppSelector(selectVacancies)
  const total = useAppSelector(selectTotal)

  useEffect(() => {
    return () => {
      dispatch(resetAll())
    }
  }, [dispatch])

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
