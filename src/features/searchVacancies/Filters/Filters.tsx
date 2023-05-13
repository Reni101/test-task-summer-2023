import { Button, NumberInput, Select } from '@mantine/core'
import { KeyboardEvent, useEffect } from 'react'
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

export const Filters = () => {
  const dispatch = useAppDispatch()
  const isLoading = useAppSelector(selectIsLoading)
  const catalogs = useAppSelector(selectCatalogs)

  const { setSearch, setSearchParams, payment_fromState, payment_toState, categoryState } =
    useSearch()

  const pressEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    e.key === 'Enter' && setSearch()
  }

  const resetAllHandler = () => {
    dispatch(resetAllFilters())
    dispatch(getVacancies())
    setSearchParams(undefined)
  }

  const inputStyles = {
    input: { height: '42px', borderRadius: '8px', margin: ' 8px 0 8px;' },
    control: { border: 'none', opacity: 0.2 }
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
        rightSection={<ChevronDown size={25} strokeWidth={1} color={'#D5D6DC'} />}
        onChange={value => {
          dispatch(setSearchQueryParams({ catalogues: value }))
        }}
        rightSectionWidth={40}
        value={categoryState}
        data={dataForSelect}
      />
      <div className={styles.title}>Оклад</div>

      <NumberInput
        data-elem='salary-from-input'
        value={payment_fromState ?? ''}
        onChange={value => {
          dispatch(setSearchQueryParams({ payment_from: value === '' ? null : value }))
        }}
        placeholder='От'
        rightSectionWidth={40}
        styles={inputStyles}
        onKeyDown={pressEnter}
        min={0}
      />
      <NumberInput
        data-elem='salary-to-input'
        value={payment_toState ?? ''}
        onChange={value => {
          dispatch(setSearchQueryParams({ payment_to: value === '' ? null : value }))
        }}
        placeholder='До'
        rightSectionWidth={40}
        styles={inputStyles}
        onKeyDown={pressEnter}
      />
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
