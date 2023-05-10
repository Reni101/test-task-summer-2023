import { useAppDispatch, useAppSelector } from 'common/hooks/hooks'
import {
  changeCurrentPage,
  getVacancies,
  selectCurrentPage
} from 'features/searchVacancies/searchVacancies.slice'
import { useEffect } from 'react'
import { Pagination } from '@mantine/core'
import { Filters } from 'features/searchVacancies/Filters/Filters'

import { SearchInput } from 'features/searchVacancies/SearchInput/SearchInput'
import { Vacancies } from 'features/searchVacancies/Vacancies/Vacancies'
import { selectTotalPage } from 'app/app.slice'
import styles from './SearchVacancies.module.css'

export const SearchVacancies = () => {
  const dispatch = useAppDispatch()
  const currentPage = useAppSelector(selectCurrentPage)
  const filters = useAppSelector(state => state.searchVacancies.filters)
  const totalPage = useAppSelector(selectTotalPage)

  const setPageHandle = (page: number) => {
    dispatch(changeCurrentPage(page))
  }

  useEffect(() => {
    dispatch(getVacancies())
  }, [currentPage, filters, dispatch])

  return (
    <div className={styles.container}>
      <Filters />
      <div className={styles.searchContainer}>
        <SearchInput />
        <Vacancies />
        <Pagination
          value={currentPage}
          className={styles.pagination}
          onChange={setPageHandle}
          total={totalPage}
        />
      </div>
    </div>
  )
}
