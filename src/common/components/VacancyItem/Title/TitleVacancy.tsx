import { FC, memo } from 'react'
import classNames from 'classnames'
import styles from 'common/components/VacancyItem/Title/TitleVacancy.module.scss'

interface PropsType {
  profession: string
  isCurrentVacancy: boolean
}

export const TitleVacancy: FC<PropsType> = memo(({ profession, isCurrentVacancy }) => {
  return (
    <div
      className={classNames(styles.title, {
        [styles.titleCurrent]: isCurrentVacancy
      })}
    >
      {profession}
    </div>
  )
})
