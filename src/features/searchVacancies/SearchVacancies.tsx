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
import { SEARCH_PARAMS } from 'common/enums/SEARCHPARAMS'
import { useQueryParams } from 'common/hooks/useQueryParams'

export const SearchVacancies = () => {
  const dispatch = useAppDispatch()
  const isLoading = useAppSelector(selectIsLoading)
  const totalPage = useAppSelector(selectTotalPage)
  const currentPage = useAppSelector(selectCurrentPage)
  const { getQueryParams, setQueryParams } = useQueryParams()

  const keyQuery = getQueryParams(SEARCH_PARAMS.KEYWORD) as string | null

  const [keyWord, setKeyWord] = useState<string>(keyQuery ?? '')

  const setPageHandle = (page: number) => {
    dispatch(changeCurrentPage(page))
    setQueryParams(page, SEARCH_PARAMS.PAGE)
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
