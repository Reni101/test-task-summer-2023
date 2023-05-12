import { FC } from 'react'
import classNames from 'classnames'
import { useNavigate } from 'react-router-dom'
import { PATH } from 'common/enums/PATH'
import styles from 'common/components/VacancyItem/Title/TitleVacancy.module.scss'

interface PropsType {
  id: number
  profession: string
  isCurrentVacancy: boolean
}

export const TitleVacancy: FC<PropsType> = ({ id, profession, isCurrentVacancy }) => {
  const navigate = useNavigate()

  const navigateToVacancy = () => {
    navigate(`${PATH.CURRENT_VACANCY}${id}`)
  }

  return (
    <div
      onClick={navigateToVacancy}
      className={classNames(styles.title, { [styles.titleCurrent]: isCurrentVacancy })}
    >
      {profession}
    </div>
  )
}
