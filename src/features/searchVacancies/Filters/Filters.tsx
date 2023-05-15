import { Button } from '@mantine/core'
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from 'common/hooks/useAppHooks'
import { getCatalogs } from 'features/searchVacancies/Filters/catalogs.slice'
import { getVacancies, resetAllFilters } from 'features/searchVacancies/searchVacancies.slice'
import { X } from 'tabler-icons-react'
import { selectIsLoading } from 'app/app.selectors'
import styles from 'features/searchVacancies/Filters/Filters.module.scss'
import classNames from 'classnames'
import { useSearch } from 'common/hooks/useSearch'
import { InputsNumberContainer } from 'features/searchVacancies/Filters/InputsNumberContainer/InputsNumberContainer'
import { SelectContainer } from 'features/searchVacancies/Filters/SelectContainer/SelectContainer'

export const Filters = () => {
  const dispatch = useAppDispatch()
  const isLoading = useAppSelector(selectIsLoading)

  const { setSearch, setSearchParams } = useSearch()

  const resetAllHandler = () => {
    setSearchParams(undefined)
    dispatch(resetAllFilters())
    dispatch(getVacancies())
  }

  useEffect(() => {
    dispatch(getCatalogs())
  }, [dispatch])

  return (
    <div className={classNames(styles.container, { [styles.disabled]: isLoading })}>
      <div className={styles.filterHead}>
        <span className={styles.title}>Фильтры</span>
        <Button
          variant='white'
          radius='md'
          compact
          rightIcon={<X size={15} strokeWidth={1.5} />}
          onClick={resetAllHandler}
        >
          Сбросить все
        </Button>
      </div>

      <div className={styles.title}>Отрасль</div>

      <SelectContainer />

      <div className={styles.title}>Оклад</div>

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
