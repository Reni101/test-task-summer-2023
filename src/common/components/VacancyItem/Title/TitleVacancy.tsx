import React, { FC } from 'react'
import classNames from 'classnames'
import { useNavigate } from 'react-router-dom'
import { PATH } from 'common/enums/PATH'
import { IVacancy } from 'features/searchVacancies/searchVacancies.api'
import styles from './TitleVacancy.module.css'

interface PropsType {
  vacancy: IVacancy
  isCurrentVacancy: boolean
}

export const TitleVacancy: FC<PropsType> = ({ vacancy, isCurrentVacancy }) => {
  const navigate = useNavigate()

  const navigateToVacancy = () => {
    navigate(`${PATH.CURRENT_VACANCY}${vacancy.id}`)
  }

  return (
    <div
      onClick={navigateToVacancy}
      className={classNames(styles.title, { [styles.titleCurrent]: isCurrentVacancy })}
    >
      {vacancy.profession}
    </div>
  )
}
