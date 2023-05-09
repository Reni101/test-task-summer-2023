import React from 'react'
import { Button } from '@mantine/core'
import { useNavigate } from 'react-router-dom'
import notFound from '../../common/assets/Frame.svg'
import styles from './NotFound.module.css'

export const NotFound = () => {
  const navigate = useNavigate()

  const goSearchJobPageHandler = () => {
    navigate('/')
  }
  return (
    <div className={styles.container}>
      <img src={notFound} alt='not found' />
      <div>Упс, здесь еще ничего нет! Поиск Вакансий</div>
      <Button variant='light' onClick={goSearchJobPageHandler}>
        Поиск вакансий
      </Button>
    </div>
  )
}
