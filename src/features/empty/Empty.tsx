import React from 'react'
import { Button } from '@mantine/core'
import { useNavigate } from 'react-router-dom'
import styles from 'features/empty/Empty.module.css'
import { PATH } from 'common/enums/PATH'
import notFound from '../../common/assets/Frame.svg'

export const Empty = () => {
  const navigate = useNavigate()

  const goSearchJobPageHandler = () => {
    navigate(PATH.SEARCH_VACANCIES)
  }

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
