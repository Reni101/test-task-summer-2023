import { Button, NumberInput, Select } from '@mantine/core'
import { KeyboardEvent, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from 'common/hooks/hooks'
import { catalogsSelector, getCatalogs } from 'features/searchVacancies/Filters/catalogs.slice'
import {
  changeCurrentPage,
  resetAll,
  setSearchQueryParams
} from 'features/searchVacancies/searchVacancies.slice'
import { ChevronDown, X } from 'tabler-icons-react'
import styles from './Filters.module.css'

export const Filters = () => {
  const dispatch = useAppDispatch()
  const catalogs = useAppSelector(catalogsSelector)

  const [category, setCategory] = useState<string | null>(null)
  const [payment_from, setPayment_from] = useState<number | ''>('')
  const [payment_to, setPayment_to] = useState<number | ''>('')

  const inputStyles = {
    input: { height: '42px' },
    control: { border: 'none', opacity: 0.2 }
  }

  const searchHandler = () => {
    dispatch(setSearchQueryParams({ catalogues: category, payment_from, payment_to }))
    dispatch(changeCurrentPage(1))
  }

  const pressEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    e.key === 'Enter' && searchHandler()
  }

  const resetAllHandler = async () => {
    await setPayment_from('')
    await setPayment_to('')
    await setCategory(null)
    dispatch(resetAll())
  }

  useEffect(() => {
    dispatch(getCatalogs())
  }, [dispatch])

  return (
    <div className={styles.container}>
      <div className={styles.filterHead}>
        <span className={styles.title}>Фильтры</span>
        <Button
          variant='white'
          radius='md'
          compact
          rightIcon={<X size={15} strokeWidth={1.5} />}
          onClick={resetAllHandler}
        >
          Сбросить всё
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
        onChange={key => {
          setCategory(key)
        }}
        rightSectionWidth={40}
        value={category}
        data={catalogs.map(catalog => {
          return {
            value: catalog.key.toString(),
            label: catalog.title
          }
        })}
        onKeyDown={pressEnter}
      />
      <div className={styles.title}>Оклад</div>
      <NumberInput
        data-elem='salary-from-input'
        className={styles.inputNumber}
        value={payment_from}
        onChange={value => setPayment_from(value)}
        placeholder='От'
        rightSectionWidth={40}
        styles={inputStyles}
        onKeyDown={pressEnter}
      />
      <NumberInput
        data-elem='salary-to-input'
        className={styles.inputNumber}
        value={payment_to}
        onChange={value => setPayment_to(value)}
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
