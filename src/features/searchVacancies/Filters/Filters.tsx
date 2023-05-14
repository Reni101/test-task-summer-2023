import { Button, Select } from '@mantine/core'
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from 'common/hooks/useAppHooks'
import { getCatalogs, selectCatalogs } from 'features/searchVacancies/Filters/catalogs.slice'
import {
  getVacancies,
  resetAllFilters,
  setSearchQueryParams
} from 'features/searchVacancies/searchVacancies.slice'
import { ChevronDown, X } from 'tabler-icons-react'
import { selectIsLoading } from 'app/app.selectors'
import styles from 'features/searchVacancies/Filters/Filters.module.scss'
import classNames from 'classnames'
import { useSearch } from 'common/hooks/useSearch'
import { InputsNumberContainer } from 'features/searchVacancies/Filters/InputsNumberContainer/InputsNumberContainer'

export const Filters = () => {
  const dispatch = useAppDispatch()
  const isLoading = useAppSelector(selectIsLoading)
  const catalogs = useAppSelector(selectCatalogs)

  const { setSearch, setSearchParams, categoryState } = useSearch()

  const resetAllHandler = () => {
    setSearchParams(undefined)
    dispatch(resetAllFilters())
    dispatch(getVacancies())
  }

  const dataForSelect = catalogs.map(catalog => ({
    value: catalog.key.toString(),
    label: catalog.title
  }))

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
      <Select
        data-elem='industry-select'
        placeholder='Выберете отрасль'
        searchable
        clearable
        styles={{
          rightSection: { pointerEvents: 'none' },
          input: { height: '42px', borderRadius: '8px', marginBottom: '20px' }
        }}
        rightSection={<ChevronDown size={25} strokeWidth={1.5} color={'#acadb9'} />}
        onChange={value => {
          dispatch(setSearchQueryParams({ catalogues: value }))
        }}
        rightSectionWidth={40}
        value={categoryState}
        data={dataForSelect}
      />
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
