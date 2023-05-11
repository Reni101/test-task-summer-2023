import { useAppDispatch, useAppSelector } from 'common/hooks/hooks'
import { changeCurrentPage } from 'features/searchVacancies/searchVacancies.slice'
import { Pagination } from '@mantine/core'
import { Filters } from 'features/searchVacancies/Filters/Filters'
import { SearchInput } from 'features/searchVacancies/SearchInput/SearchInput'
import { Vacancies } from 'features/searchVacancies/Vacancies/Vacancies'
import {
  selectCurrentPage,
  selectTotalPage
} from 'features/searchVacancies/searchVacancies.selectors'
import styles from './SearchVacancies.module.css'

export const SearchVacancies = () => {
  const dispatch = useAppDispatch()
  const currentPage = useAppSelector(selectCurrentPage)
  const totalPage = useAppSelector(selectTotalPage)

  const setPageHandle = (page: number) => {
    dispatch(changeCurrentPage(page))
  }

  return (
    <div className={styles.container}>
      <Filters />
      <div className={styles.searchContainer}>
        <SearchInput />
        <Vacancies />
        <Pagination
          className={styles.pagination}
          value={currentPage}
          onChange={setPageHandle}
          total={totalPage}
        />
      </div>
    </div>
  )
}
