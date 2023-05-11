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
  const { id, profession, ...restProps } = vacancy

  return (
    <div data-elem={`vacancy-${vacancy.id}`} className={styles.container}>
      <div>
        <TitleVacancy id={id} profession={profession} isCurrentVacancy={isCurrentVacancy} />
        <Description isCurrentVacancy={isCurrentVacancy} {...restProps} />
      </div>

      <ToggleFavorite vacancy={vacancy} />
    </div>
  )
})
