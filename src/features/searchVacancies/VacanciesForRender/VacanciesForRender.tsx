import { useAppDispatch, useAppSelector } from 'common/hooks/hooks'
import { VacancyItem } from 'common/components/VacancyItem/VacancyItem'
import { Navigate } from 'react-router-dom'
import { useEffect } from 'react'
import { clearState } from 'features/searchVacancies/searchVacancies.slice'
import styles from './VacanciesForRender.module.css'

export const VacanciesForRender = () => {
  const dispatch = useAppDispatch()
  const data = useAppSelector(state => state.searchVacancies)

  useEffect(() => {
    return () => {
      dispatch(clearState())
    }
  }, [dispatch])

  if (data.total === 0) {
    return <Navigate to='/404' />
  }

  return (
    <div className={styles.vacancies}>
      {data.objects.length ? (
        data.objects.map(vacancy => {
          return <VacancyItem vacancy={vacancy} key={vacancy.id} isCurrentVacancy={false} />
        })
      ) : (
        <div>loaading</div>
      )}
    </div>
  )
}
