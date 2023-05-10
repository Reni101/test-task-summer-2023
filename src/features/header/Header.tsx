import { useAppSelector } from 'common/hooks/hooks'
import { NavLink } from 'react-router-dom'
import LoadingBar from 'react-top-loading-bar'
import { PATH } from 'common/enums/PATH'
import { selectIsLoading } from 'app/app.selectors'
import logo from '../../common/assets/union.svg'
import Jobored from '../../common/assets/jobored.svg'
import styles from './Header.module.css'

export const Header = () => {
  const isLoading = useAppSelector(selectIsLoading)

  return (
    <div className={styles.container}>
      {isLoading && (
        <LoadingBar
          height={5}
          progress={100}
          transitionTime={600000}
          color={'#5E96FC'}
          loaderSpeed={1000}
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
