import { useAppSelector } from 'common/hooks/hooks'
import { NavLink } from 'react-router-dom'
import LoadingBar from 'react-top-loading-bar'
import logo from '../../common/assets/union.svg'
import Jobored from '../../common/assets/jobored.svg'
import styles from './Header.module.css'

export const Header = () => {
  const status = useAppSelector(state => state.app.status)

  return (
    <div className={styles.container}>
      {status === 'loading' && (
        <LoadingBar
          height={5}
          progress={100}
          transitionTime={6000000}
          color={'#5E96FC'}
          loaderSpeed={1000}
        />
      )}
      <div className={styles.logo}>
        <img src={logo} alt='alt' />
        <img className={styles.text} src={Jobored} alt='alt' />
      </div>

      <div className={styles.navigation}>
        <NavLink to={'/'} className={({ isActive }) => (isActive ? styles.active : '')}>
          Поиск вакансий
        </NavLink>
        <NavLink to={'/favorite'} className={({ isActive }) => (isActive ? styles.active : '')}>
          Избранное
        </NavLink>
      </div>
    </div>
  )
}