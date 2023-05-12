import { useEffect } from 'react'
import styles from 'app/App.module.css'
import { Header } from 'features/header/Header'
import { SearchVacancies } from 'features/searchVacancies/SearchVacancies'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Favorite } from 'features/favorite/Favorite'
import { useAppDispatch, useAppSelector } from 'common/hooks/hooks'
import { authAndRefresh } from 'features/auth/auth.slice'
import { Loader } from '@mantine/core'
import { Empty } from 'features/empty/Empty'
import { PATH } from 'common/enums/PATH'
import { CurrentVacancy } from 'features/currentVacancy/CurrentVacancy'
import { selectIsInitialized } from 'app/app.selectors'

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
      <div className={styles.container}>
        <Routes>
          <Route path={PATH.SEARCH_VACANCIES} element={<SearchVacancies />} />
          <Route path={PATH.FAVORITE} element={<Favorite />} />
          <Route path={`${PATH.CURRENT_VACANCY}:id`} element={<CurrentVacancy />} />
          <Route path={PATH.EMPTY} element={<Empty />} />
          <Route path='*' element={<Navigate to={PATH.SEARCH_VACANCIES} />} />
        </Routes>
      </div>
    </>
  )
}
