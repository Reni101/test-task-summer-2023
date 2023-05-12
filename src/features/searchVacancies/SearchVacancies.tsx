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
import { useState } from 'react'
import { selectIsLoading } from 'app/app.selectors'
import styles from 'features/searchVacancies/SearchVacancies.module.scss'
import classNames from 'classnames'
import { useSearchParams } from 'react-router-dom'
import { SEARCH_PARAMS } from 'common/enums/SEARCHPARAMS'

export const SearchVacancies = () => {
  const dispatch = useAppDispatch()
  const isLoading = useAppSelector(selectIsLoading)
  const currentPage = useAppSelector(selectCurrentPage)
  const totalPage = useAppSelector(selectTotalPage)
  const [searchParams, setSearchParams] = useSearchParams()

  const [keyWord, setKeyWord] = useState<string>(searchParams.get(SEARCH_PARAMS.KEYWORD) || '')

  const setPageHandle = (page: number) => {
    dispatch(changeCurrentPage(page))
    if (page === 1) {
      searchParams.delete(SEARCH_PARAMS.PAGE)
      setSearchParams(searchParams)
    } else {
      searchParams.set(SEARCH_PARAMS.PAGE, page.toString())
      setSearchParams(searchParams)
    }
  }

  return (
    <div className={styles.container}>
      <Filters keyWord={keyWord} setKeyWord={setKeyWord} />
      <div className={styles.searchContainer}>
        <SearchInput keyWord={keyWord} setKeyWord={setKeyWord} />
        <Vacancies />
        <Pagination
          className={classNames(styles.pagination, { [styles.disabled]: isLoading })}
          value={currentPage}
          onChange={setPageHandle}
          total={totalPage}
        />
      </div>
    </div>
  )
}
