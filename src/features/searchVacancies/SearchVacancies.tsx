import { useAppSelector } from 'common/hooks/hooks'
import { Pagination } from '@mantine/core'
import { Filters } from 'features/searchVacancies/Filters/Filters'
import { SearchInput } from 'features/searchVacancies/SearchInput/SearchInput'
import { Vacancies } from 'features/searchVacancies/Vacancies/Vacancies'
import {
  selectCurrentPage,
  selectTotalPage
} from 'features/searchVacancies/searchVacancies.selectors'
import { selectIsLoading } from 'app/app.selectors'
import styles from 'features/searchVacancies/SearchVacancies.module.scss'
import classNames from 'classnames'
import { useEffect } from 'react'
import { useSearch } from 'common/hooks/useSearch'

export const SearchVacancies = () => {
  const isLoading = useAppSelector(selectIsLoading)
  const totalPage = useAppSelector(selectTotalPage)
  const currentPage = useAppSelector(selectCurrentPage)
  const { setPage } = useSearch()

  const setPageHandle = (page: number) => {
    setPage(page)
  }

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [currentPage])

  return (
    <div className={styles.container}>
      <Filters />
      <div className={styles.searchContainer}>
        <SearchInput />
        <Vacancies />
        <Pagination
          className={classNames(styles.pagination, { [styles.disabled]: isLoading })}
          value={(currentPage ?? 0) + 1}
          onChange={setPageHandle}
          total={totalPage}
        />
      </div>
    </div>
  )
}
