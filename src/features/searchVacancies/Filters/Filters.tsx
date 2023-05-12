import { Button, NumberInput, Select } from '@mantine/core'
import { FC, KeyboardEvent, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from 'common/hooks/hooks'
import { getCatalogs, selectCatalogs } from 'features/searchVacancies/Filters/catalogs.slice'
import {
  changeCurrentPage,
  resetAllFilters,
  setSearchQueryParams
} from 'features/searchVacancies/searchVacancies.slice'
import { ChevronDown, X } from 'tabler-icons-react'
import {
  selectCatalog,
  selectPaymentFrom,
  selectPaymentTo
} from 'features/searchVacancies/searchVacancies.selectors'
import { selectIsLoading } from 'app/app.selectors'
import styles from 'features/searchVacancies/Filters/Filters.module.scss'
import classNames from 'classnames'
import { useSearchParams } from 'react-router-dom'

interface PropsType {
  keyWord: string | null
  setKeyWord: (keyword: string) => void
}

export const Filters: FC<PropsType> = ({ keyWord, setKeyWord }) => {
  const dispatch = useAppDispatch()
  const isLoading = useAppSelector(selectIsLoading)
  const catalogs = useAppSelector(selectCatalogs)
  const payment_fromState = useAppSelector(selectPaymentFrom)
  const payment_toState = useAppSelector(selectPaymentTo)
  const catalogState = useAppSelector(selectCatalog)

  const [category, setCategory] = useState<string | null>(catalogState)
  const [payment_fromInput, setPayment_fromInput] = useState<number | ''>(payment_fromState ?? '')
  const [payment_toInput, setPayment_toInput] = useState<number | ''>(payment_toState ?? '')

  const [searchParams, setSearchParams] = useSearchParams()

  const searchHandler = () => {
    const payment_from = payment_fromInput === '' ? null : payment_fromInput
    const payment_to = payment_toInput === '' ? null : payment_toInput

    dispatch(
      setSearchQueryParams({ catalogues: category, payment_from, payment_to, keyword: keyWord })
    )
    dispatch(changeCurrentPage(1))
  }

  const pressEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    e.key === 'Enter' && searchHandler()
  }

  const resetAllHandler = () => {
    setKeyWord('')
    setPayment_fromInput('')
    setPayment_toInput('')
    setCategory(null)
    dispatch(changeCurrentPage(1))
    setSearchParams({})
    dispatch(resetAllFilters())
  }

  useEffect(() => {
    dispatch(getCatalogs())
  }, [dispatch])

  const inputStyles = {
    input: { height: '42px', borderRadius: '8px', margin: ' 8px 0 8px;' },
    control: { border: 'none', opacity: 0.2 }
  }

  const dataForSelect = catalogs.map(catalog => ({
    value: catalog.key.toString(),
    label: catalog.title
  }))

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
        styles={{
          rightSection: { pointerEvents: 'none' },
          input: { height: '42px', borderRadius: '8px', marginBottom: '20px' }
        }}
        rightSection={<ChevronDown size={25} strokeWidth={1} color={'#D5D6DC'} />}
        onChange={setCategory}
        rightSectionWidth={40}
        value={category}
        data={dataForSelect}
        onKeyDown={pressEnter}
      />
      <div className={styles.title}>Оклад</div>

      <NumberInput
        data-elem='salary-from-input'
        value={payment_fromInput}
        onChange={setPayment_fromInput}
        placeholder='От'
        rightSectionWidth={40}
        styles={inputStyles}
        onKeyDown={pressEnter}
        min={0}
      />
      <NumberInput
        data-elem='salary-to-input'
        value={payment_toInput}
        onChange={setPayment_toInput}
        placeholder='До'
        rightSectionWidth={40}
        styles={inputStyles}
        onKeyDown={pressEnter}
      />
      <Button
        data-elem='search-button'
        className={styles.buttonAccept}
        onClick={searchHandler}
        fullWidth={true}
      >
        Применить
      </Button>
    </div>
  )
}
