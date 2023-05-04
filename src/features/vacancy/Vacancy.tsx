import React from 'react'
import { useLocation } from 'react-router-dom'
import { IVacancy } from 'features/searchVacancies/searchVacancies.api'
import { paymentResult } from 'common/utils/payment'
import { MapPin } from 'tabler-icons-react'
import styles from './Vacancy.module.css'

export const Vacancy = () => {
  const location = useLocation()
  let vacancy = location.state as IVacancy

  return (
    <div>
      <div className={styles.vacContainer}>
        <div> {vacancy.profession}</div>
        <div>
          {paymentResult(vacancy.payment_from, vacancy.payment_to, vacancy.currency)}
          {' • '}
          {vacancy.type_of_work?.title}
        </div>
        <div>
          <MapPin size={20} color={'#000000'} style={{ opacity: 0.5 }} /> {vacancy.town.title}
        </div>
      </div>

      <div
        className={styles.descriptionContainer}
        dangerouslySetInnerHTML={{ __html: vacancy.vacancyRichText }}
      ></div>
    </div>
  )
}
