import React, { useEffect } from 'react'
import { Button } from '@mantine/core'
import { useNavigate } from 'react-router-dom'
import styles from 'features/empty/Empty.module.css'
import { PATH } from 'common/enums/PATH'
import { useAppDispatch, useAppSelector } from 'common/hooks/hooks'
import { resetAll, setTotal } from 'features/searchVacancies/searchVacancies.slice'
import { selectTotal } from 'features/searchVacancies/searchVacancies.selectors'
import notFound from '../../common/assets/Frame.svg'

export const Empty = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const totalVacancy = useAppSelector(selectTotal)

  const goSearchJobPageHandler = () => {
    navigate(PATH.SEARCH_VACANCIES)
  }

  useEffect(() => {
    if (totalVacancy === 0) {
      dispatch(resetAll())
      dispatch(setTotal())
    }
  }, [])

  return (
    <div className={styles.container}>
      <img src={notFound} alt='not found' />
      <div>Упс, здесь еще ничего нет!</div>
      <Button variant='light' onClick={goSearchJobPageHandler}>
        Поиск Вакансий
      </Button>
    </div>
  )
}
