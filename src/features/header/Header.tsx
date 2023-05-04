import { useAppSelector } from 'common/hooks/hooks'
import { Loader } from '@mantine/core'
import { NavLink } from 'react-router-dom'
import logo from '../../common/assets/union.svg'
import Jobored from '../../common/assets/jobored.svg'
import styles from './Header.module.css'

export const Header = () => {
  const status = useAppSelector(state => state.app.status)
  const error = useAppSelector(state => state.app.error)
  console.log()
  return (
    <div className={styles.container}>
      {status === 'loading' && <Loader className={styles.loader} variant='dots' />}
      {/*{error && <div>{error}</div>}*/}
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
