import React from 'react'
import { useLocation } from 'react-router-dom'
import { IVacancy } from 'features/searchVacancies/searchVacancies.api'
import { VacancyItem } from 'common/components/VacancyItem/VacancyItem'
import styles from './Vacancy.module.css'

export const Vacancy = () => {
  const location = useLocation()
  let vacancy = location.state as IVacancy

  return (
    <div className={styles.container}>
      <VacancyItem vacancy={vacancy} key={vacancy.id} isCurrentVacancy={true} />

      <div
        className={styles.descriptionContainer}
        dangerouslySetInnerHTML={{ __html: vacancy.vacancyRichText }}
      ></div>
    </div>
  )
}
