import React from 'react'
import { Button } from '@mantine/core'
import { X } from 'tabler-icons-react'
import { getVacancies, resetAllFilters } from 'features/searchVacancies/searchVacancies.slice'
import { useSearchParams } from 'react-router-dom'
import { useAppDispatch } from 'common/hooks/useAppHooks'
import styles from './FiltreTitle.module.scss'

export const FilterTitle = () => {
  const dispatch = useAppDispatch()
  const [searchParams, setSearchParams] = useSearchParams()

  const resetAllHandler = () => {
    setSearchParams(undefined)
    dispatch(resetAllFilters())
    dispatch(getVacancies())
  }

  return (
    <div className={styles.titleContainer}>
      <span className={styles.title}>Фильтры</span>
      <Button variant='white' compact rightIcon={<X size={15} />} onClick={resetAllHandler}>
        Сбросить все
      </Button>
    </div>
  )
}
