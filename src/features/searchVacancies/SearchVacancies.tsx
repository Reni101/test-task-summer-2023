import { useAppDispatch, useAppSelector } from 'common/hooks/hooks'
import {
  changeCurrentPage,
  getVacancies,
  resetAllFilters,
  setTotal
} from 'features/searchVacancies/searchVacancies.slice'
import { useEffect } from 'react'
import { Pagination } from '@mantine/core'
import { Filters } from 'features/searchVacancies/Filters/Filters'
import { SearchInput } from 'features/searchVacancies/SearchInput/SearchInput'
import { Vacancies } from 'features/searchVacancies/Vacancies/Vacancies'
import {
  selectCurrentPage,
  selectFilters,
  selectTotalPage
} from 'features/searchVacancies/searchVacancies.selectors'
import styles from './SearchVacancies.module.css'

export const SearchVacancies = () => {
  const dispatch = useAppDispatch()
  const currentPage = useAppSelector(selectCurrentPage)
  const filters = useAppSelector(selectFilters)
  const totalPage = useAppSelector(selectTotalPage)

  const setPageHandle = (page: number) => {
    dispatch(changeCurrentPage(page))
  }

  useEffect(() => {
    dispatch(getVacancies())
  }, [currentPage, filters, dispatch])

  useEffect(() => {
    return () => {
      dispatch(resetAllFilters())
      dispatch(setTotal(null))
    }
  }, [])

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
