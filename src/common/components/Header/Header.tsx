import { useAppSelector } from 'common/hooks/useAppHooks'
import { NavLink } from 'react-router-dom'
import { PATH } from 'common/enums/PATH'
import { selectIsLoading } from 'app/app.selectors'
import { NavigationProgress, nprogress } from '@mantine/nprogress'
import { useEffect } from 'react'
import logo from 'common/assets/union.svg'
import Jobored from 'common/assets/jobored.svg'
import styles from './Header.module.scss'

export const Header = () => {
  const isLoading = useAppSelector(selectIsLoading)

  useEffect(() => {
    if (isLoading) {
      nprogress.start()
    } else {
      nprogress.complete()
      nprogress.reset()
    }
  }, [isLoading])

  return (
    <header className={styles.container}>
      <NavigationProgress
        stepInterval={5}
        transitionDuration={1000}
        color='#5E96FC'
        size={5}
        exitTimeout={1000}
      />

      <div className={styles.logo}>
        <img src={logo} alt='logo' />
        <img className={styles.text} src={Jobored} alt='alt' />
      </div>

      <nav className={styles.navigation}>
        <NavLink
          to={PATH.SEARCH_VACANCIES}
          className={({ isActive }) => (isActive ? styles.active : '')}
        >
          Поиск Вакансий
        </NavLink>

        <NavLink to={PATH.FAVORITE} className={({ isActive }) => (isActive ? styles.active : '')}>
          Избранное
        </NavLink>
      </nav>
    </header>
  )
}
