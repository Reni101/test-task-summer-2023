import { IVacancy } from 'features/searchVacancies/searchVacancies.api'
import React, { FC, memo } from 'react'
import { ToggleFavorite } from 'common/components/VacancyItem/ToggleFavorite/ToggleFavorite'
import { TitleVacancy } from 'common/components/VacancyItem/Title/TitleVacancy'
import { Description } from 'common/components/VacancyItem/Description/Description'
import styles from 'common/components/VacancyItem/VacancyItem.module.scss'
import { PATH } from 'common/enums/PATH'
import classNames from 'classnames'
import { LinkHoc } from 'common/hoc/LinkHoc'

interface PropsType {
  vacancy: IVacancy
  isCurrentVacancy: boolean
}

export const VacancyItem: FC<PropsType> = memo(({ vacancy, isCurrentVacancy }) => {
  const { id, profession, ...restProps } = vacancy

  return (
    <LinkHoc
      href={!isCurrentVacancy ? `${PATH.CURRENT_VACANCY}${id}` : null}
      data-elem={`vacancy-${vacancy.id}`}
      vacancyId={vacancy.id}
      className={classNames(styles.container, { [styles.currentContainer]: isCurrentVacancy })}
    >
      <div>
        <TitleVacancy profession={profession} isCurrentVacancy={isCurrentVacancy} />
        <Description isCurrentVacancy={isCurrentVacancy} {...restProps} />
      </div>

      <ToggleFavorite vacancy={vacancy} />
    </LinkHoc>
  )
})
