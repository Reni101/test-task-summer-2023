import { Button, NumberInput, Select } from '@mantine/core'
import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from 'common/hooks/hooks'
import { getCatalogs } from 'features/searchVacancies/Filters/catalogs.slice'
import { changeCurrentPage, setSearchParams } from 'features/searchVacancies/searchVacancies.slice'
import styles from './Filters.module.css'

export const Filters = () => {
  const dispatch = useAppDispatch()
  const catalogs = useAppSelector(state => state.catalogs)

  const [category, setCategory] = useState<null | string>(null)
  const [payment_from, setPayment_from] = useState<number | ''>('')
  const [payment_to, setPayment_to] = useState<number | ''>('')

  const searchHandler = () => {
    dispatch(setSearchParams({ catalogues: category, payment_from, payment_to }))
  }

  const resetAllHandler = () => {
    setPayment_from('')
    setPayment_to('')
    setCategory(null)
    dispatch(setSearchParams({ catalogues: null, payment_to: '', payment_from: '', keyword: '' }))
    dispatch(changeCurrentPage(0))
  }

  useEffect(() => {
    dispatch(getCatalogs())
  }, [])

  return (
    <div className={styles.container}>
      <div className={styles.filterHead}>
        <span>Фильтры</span>

        <Button onClick={resetAllHandler} variant='default'>
          сбросить всё
        </Button>
      </div>

      <div>Отрасль</div>

      <Select
        placeholder='Выберете отрасль'
        onChange={key => {
          setCategory(key)
        }}
        value={category}
        data={catalogs.map(catalog => {
          return {
            value: catalog.key.toString(),
            label: catalog.title
          }
        })}
      />
      <div>Оклад</div>
      <NumberInput
        className={styles.inputNumber}
        value={payment_from}
        onChange={value => setPayment_from(value as number)}
        placeholder='От'
        styles={{ input: { height: '42px' }, control: { border: 'none', opacity: 0.5 } }}
      />
      <NumberInput
        className={styles.inputNumber}
        value={payment_to}
        data-elem='salary-to-input'
        onChange={value => setPayment_to(value as number)}
        placeholder='До'
        styles={{
          input: { height: '42px' },
          control: { border: 'none', opacity: 0.5 }
        }}
      />
      <Button onClick={searchHandler} fullWidth={true}>
        Принять
      </Button>
    </div>
  )
}
