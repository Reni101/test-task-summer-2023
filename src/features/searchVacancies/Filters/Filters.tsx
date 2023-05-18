import { Button } from '@mantine/core'
import { useEffect } from 'react'
import { useAppDispatch } from 'common/hooks/useAppHooks'
import { getCatalogs } from 'features/searchVacancies/Filters/catalogs.slice'
import styles from 'features/searchVacancies/Filters/Filters.module.scss'
import { useSearch } from 'common/hooks/useSearch'
import { InputsNumberContainer } from 'features/searchVacancies/Filters/InputsNumberContainer/InputsNumberContainer'
import { SelectContainer } from 'features/searchVacancies/Filters/SelectContainer/SelectContainer'
import { FilterTitle } from 'features/searchVacancies/Filters/Title/FilterTitle'

export const Filters = () => {
  const dispatch = useAppDispatch()

  const { setSearch } = useSearch()

  useEffect(() => {
    dispatch(getCatalogs())
  }, [dispatch])

  return (
    <div className={styles.container}>
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
