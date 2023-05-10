import { IVacancy } from 'features/searchVacancies/searchVacancies.api'
import { FC, memo } from 'react'
import { ToggleFavorite } from 'common/components/VacancyItem/ToggleFavorite/ToggleFavorite'
import { TitleVacancy } from 'common/components/VacancyItem/Title/TitleVacancy'
import { Description } from 'common/components/VacancyItem/Description/Description'
import styles from './VacancyItem.module.css'

interface PropsType {
  vacancy: IVacancy
  isCurrentVacancy: boolean
}

export const VacancyItem: FC<PropsType> = memo(({ vacancy, isCurrentVacancy }) => {
  return (
    <div data-elem={`vacancy-${vacancy.id}`} className={styles.container}>
      <div className={styles.vacancyContainer}>
        <TitleVacancy vacancy={vacancy} isCurrentVacancy={isCurrentVacancy} />
        <Description isCurrentVacancy={isCurrentVacancy} {...vacancy} />
      </div>

      <ToggleFavorite vacancy={vacancy} />
    </div>
  )
})
