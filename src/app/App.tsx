import React, { useEffect } from 'react'
import styles from 'app/App.module.css'
import { Header } from 'features/header/Header'
import { SearchVacancies } from 'features/searchVacancies/SearchVacancies'
import { Route, Routes } from 'react-router-dom'
import { Favorite } from 'features/favorite/Favorite'
import { Vacancy } from 'features/vacancy/Vacancy'
import { useAppDispatch, useAppSelector } from 'common/hooks/hooks'
import { authAndRefresh } from 'features/auth/auth.slice'
import { Loader } from '@mantine/core'
import { NotFound } from 'features/notFound/NotFound'

export const App = () => {
  const dispatch = useAppDispatch()
  const isInitialized = useAppSelector(state => state.app.isInitialized)

  useEffect(() => {
    dispatch(authAndRefresh())
  }, [dispatch])

  if (!isInitialized) {
    return <Loader className={styles.loader} />
  }
  return (
    <>
      <Header />
      <div className={styles.container}>
        <Routes>
          <Route path='/' element={<SearchVacancies />} />
          <Route path='/favorite' element={<Favorite />} />
          <Route path='/vacancy/:id' element={<Vacancy />} />
          <Route path='/404' element={<NotFound />} />
        </Routes>
      </div>
    </>
  )
}
