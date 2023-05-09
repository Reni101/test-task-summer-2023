import { useAppDispatch, useAppSelector } from 'common/hooks/hooks'
import { changeCurrentPage, getVacancies } from 'features/searchVacancies/searchVacancies.slice'
import { useEffect } from 'react'
import { Pagination } from '@mantine/core'
import { Filters } from 'features/searchVacancies/Filters/Filters'

import { SearchInput } from 'features/searchVacancies/SearchInput/SearchInput'
import { Vacancies } from 'features/searchVacancies/Vacancies/Vacancies'
import styles from './SearchVacancies.module.css'

export const SearchVacancies = () => {
  const dispatch = useAppDispatch()
  const status = useAppSelector(state => state.app.status)
  const total = useAppSelector(state => state.searchVacancies.total)
  const pageCount = useAppSelector(state => state.searchVacancies.count)
  const currentPage = useAppSelector(state => state.searchVacancies.page)
  const filters = useAppSelector(state => state.searchVacancies.filters)
  const maxItems = 500

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
        total={Math.ceil(total ?? 1 > maxItems ? maxItems / pageCount : total ?? 1 / pageCount)}
        disabled={status === 'loading'}
      />
    </div>
  )
}
