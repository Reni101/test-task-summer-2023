import { useAppDispatch, useAppSelector } from 'common/hooks/hooks'
import { changeCurrentPage, getVacancies } from 'features/searchVacancies/searchVacancies.slice'
import { useEffect } from 'react'
import { Pagination } from '@mantine/core'
import { Filters } from 'features/searchVacancies/Filters/Filters'

import { SearchInput } from 'features/searchVacancies/SearchInput/SearchInput'
import { Vacancies } from 'features/searchVacancies/Vacancies/Vacancies'
import { selectTotalPage } from 'app/app.slice'
import styles from './SearchVacancies.module.css'

export const SearchVacancies = () => {
  const dispatch = useAppDispatch()
  const currentPage = useAppSelector(state => state.searchVacancies.page)
  const filters = useAppSelector(state => state.searchVacancies.filters)
  const totalPage = useAppSelector(selectTotalPage)

  const setPage = (page: number) => {
    const currentPage = page - 1
    dispatch(changeCurrentPage(currentPage))
  }

  useEffect(() => {
    dispatch(getVacancies())
  }, [currentPage, filters, dispatch])

  return (
    <div className={styles.container}>
      <div className={styles.flexContainer}>
        <Filters />
        <div className={styles.searchContainer}>
          <SearchInput />
          <Vacancies />
        </div>
      </div>

      <Pagination
        value={currentPage + 1}
        className={styles.pagination}
        onChange={setPage}
        total={totalPage}
      />
    </div>
  )
}
