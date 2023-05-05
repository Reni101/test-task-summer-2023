import { useAppSelector } from 'common/hooks/hooks'
import { SearchInput } from 'features/searchVacancies/VacanciesForRender/SearchInput/SearchInput'
import { VacancyItem } from 'common/components/VacancyItem/VacancyItem'
import { Navigate } from 'react-router-dom'
import styles from './VacanciesForRender.module.css'

export const VacanciesForRender = () => {
  const data = useAppSelector(state => state.searchVacancies)
  if (data.total === 0) {
    return <Navigate to='/404' />
  }
  return (
    <div className={styles.vacancies}>
      <SearchInput />
      {data.objects.map(vacancy => {
        return <VacancyItem vacancy={vacancy} key={vacancy.id} />
      })}
    </div>
  )
}
