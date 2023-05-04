import { useAppSelector } from 'common/hooks/hooks'
import { SearchInput } from 'features/searchVacancies/VacanciesForRender/SearchInput/SearchInput'
import { VacancyItem } from 'common/components/VacancyItem/VacancyItem'
import styles from './VacanciesForRender.module.css'

export const VacanciesForRender = () => {
  const data = useAppSelector(state => state.searchVacancies)
  const status = useAppSelector(state => state.app.status)
  return (
    <div className={styles.vacancies}>
      <SearchInput />
      {data.objects.length && status !== 'loading' ? (
        data.objects.map(vacancy => {
          return <VacancyItem vacancy={vacancy} key={vacancy.id} />
        })
      ) : (
        <div>empty</div>
      )}
    </div>
  )
}
