import { useAppDispatch, useAppSelector } from 'common/hooks/hooks'
import { Pagination } from '@mantine/core'
import { Filters } from 'features/searchVacancies/Filters/Filters'
import { SearchInput } from 'features/searchVacancies/SearchInput/SearchInput'
import { Vacancies } from 'features/searchVacancies/Vacancies/Vacancies'
import {
  selectCatalog,
  selectCurrentPage,
  selectKeyWord,
  selectPaymentFrom,
  selectPaymentTo,
  selectTotalPage
} from 'features/searchVacancies/searchVacancies.selectors'
import { selectIsLoading } from 'app/app.selectors'
import styles from 'features/searchVacancies/SearchVacancies.module.scss'
import classNames from 'classnames'
import { SEARCH_PARAMS } from 'common/enums/SEARCHPARAMS'
import { useQueryParams } from 'common/hooks/useQueryParams'
import { getVacancies, setSearchQueryParams } from 'features/searchVacancies/searchVacancies.slice'

export const SearchVacancies = () => {
  const dispatch = useAppDispatch()
  const isLoading = useAppSelector(selectIsLoading)
  const totalPage = useAppSelector(selectTotalPage)
  const currentPage = useAppSelector(selectCurrentPage)
  const categoryState = useAppSelector(selectCatalog)
  const payment_fromState = useAppSelector(selectPaymentFrom)
  const payment_toState = useAppSelector(selectPaymentTo)
  const keywordState = useAppSelector(selectKeyWord)

  const { setQueryParams } = useQueryParams()

  const onSearch = () => {
    setQueryParams(categoryState, SEARCH_PARAMS.CATALOGUES)
    setQueryParams(payment_fromState, SEARCH_PARAMS.PAYMENT_FROM)
    setQueryParams(payment_toState, SEARCH_PARAMS.PAYMENT_TO)
    setQueryParams(keywordState, SEARCH_PARAMS.KEYWORD)
    setQueryParams(null, SEARCH_PARAMS.PAGE)
    dispatch(setSearchQueryParams({ page: null }))
    dispatch(getVacancies())
  }

  const setPageHandle = (page: number) => {
    dispatch(setSearchQueryParams({ page: page - 1 }))
    setQueryParams(page, SEARCH_PARAMS.PAGE)
    dispatch(getVacancies())
  }

  return (
    <div className={styles.container}>
      <Filters onSearch={onSearch} />
      <div className={styles.searchContainer}>
        <SearchInput onSearch={onSearch} />
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
