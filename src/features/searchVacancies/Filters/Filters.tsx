import { Button } from '@mantine/core'
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from 'common/hooks/useAppHooks'
import { getCatalogs } from 'features/searchVacancies/Filters/catalogs.slice'
import { selectIsLoading } from 'app/app.selectors'
import styles from 'features/searchVacancies/Filters/Filters.module.scss'
import classNames from 'classnames'
import { useSearch } from 'common/hooks/useSearch'
import { InputsNumberContainer } from 'features/searchVacancies/Filters/InputsNumberContainer/InputsNumberContainer'
import { SelectContainer } from 'features/searchVacancies/Filters/SelectContainer/SelectContainer'
import { FilterTitle } from 'features/searchVacancies/Filters/Title/FilterTitle'

export const Filters = () => {
  const dispatch = useAppDispatch()
  const isLoading = useAppSelector(selectIsLoading)

  const { setSearch } = useSearch()

  useEffect(() => {
    dispatch(getCatalogs())
  }, [dispatch])

  return (
    <div className={classNames(styles.container, { [styles.disabled]: isLoading })}>
      <FilterTitle />
      <SelectContainer />
      <InputsNumberContainer />

      <Button
        data-elem='search-button'
        className={styles.buttonAccept}
        onClick={setSearch}
        fullWidth={true}
      >
        Применить
      </Button>
    </div>
  )
}
