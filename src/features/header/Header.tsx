import { useAppSelector } from 'common/hooks/hooks'
import { NavLink } from 'react-router-dom'
import { PATH } from 'common/enums/PATH'
import { selectIsLoading } from 'app/app.selectors'
import { NavigationProgress, nprogress } from '@mantine/nprogress'
import { useEffect } from 'react'
import logo from '../../common/assets/union.svg'
import Jobored from '../../common/assets/jobored.svg'
import styles from './Header.module.css'

export const Header = () => {
  const isLoading = useAppSelector(selectIsLoading)

  useEffect(() => {
    if (isLoading) {
      nprogress.start()
    }
  }, [isLoading])

  return (
    <div className={styles.container}>
      {isLoading && (
        <NavigationProgress
          stepInterval={5}
          transitionDuration={25}
          color={'#5E96FC'}
          size={5}
          exitTimeout={1000}
        />
      )}

      <div className={styles.logo}>
        <img src={logo} alt='alt' />
        <img className={styles.text} src={Jobored} alt='alt' />
      </div>

      <div className={styles.navigation}>
        <NavLink
          to={PATH.SEARCH_VACANCIES}
          className={({ isActive }) => (isActive ? styles.active : '')}
        >
          Поиск Вакансий
        </NavLink>
        <NavLink to={PATH.FAVORITE} className={({ isActive }) => (isActive ? styles.active : '')}>
          Избранное
        </NavLink>
      </div>
    </div>
  )
}
