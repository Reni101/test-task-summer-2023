import { useEffect } from 'react'
import styles from 'app/App.module.scss'
import { Header } from 'common/components/Header/Header'
import { SearchVacancies } from 'features/searchVacancies/SearchVacancies'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Favorite } from 'features/favorite/Favorite'
import { useAppDispatch, useAppSelector } from 'common/hooks/useAppHooks'
import { authAndRefresh } from 'features/auth/auth.slice'
import { Loader } from '@mantine/core'
import { Empty } from 'features/empty/Empty'
import { PATH } from 'common/enums/PATH'
import { CurrentVacancy } from 'features/currentVacancy/CurrentVacancy'
import { selectIsInitialized } from 'app/app.selectors'
import { ErrorNotification } from 'common/components/ErrorNotification/ErrorNotification'

export const App = () => {
  const dispatch = useAppDispatch()
  const isInitialized = useAppSelector(selectIsInitialized)

  useEffect(() => {
    dispatch(authAndRefresh())
  }, [dispatch])

  if (!isInitialized) {
    return <Loader className={styles.loader} />
  }

  return (
    <>
      <Header />
      <main className={styles.container}>
        <Routes>
          <Route path={PATH.SEARCH_VACANCIES} element={<SearchVacancies />} />
          <Route path={PATH.FAVORITE} element={<Favorite />} />
          <Route path={`${PATH.SEARCH_VACANCIES}/:id`} element={<CurrentVacancy />} />
          <Route path={PATH.EMPTY} element={<Empty />} />
          <Route path='*' element={<Navigate to={PATH.SEARCH_VACANCIES} />} />
        </Routes>
      </main>
      <ErrorNotification />
    </>
  )
}
