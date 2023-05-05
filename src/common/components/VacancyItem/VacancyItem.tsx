import { IVacancy } from 'features/searchVacancies/searchVacancies.api'
import { FC, memo } from 'react'
import { paymentResult } from 'common/utils/payment'
import { MapPin, Star } from 'tabler-icons-react'
import { useNavigate } from 'react-router-dom'
import { toggleVacancyInLS } from 'common/utils/toggleVacancyInLS'
import { localStorageKeys } from 'common/enums/localStorageKeys'
import styles from './VacancyItem.module.css'

interface PropsType {
  vacancy: IVacancy
  isCurrentVacancy: boolean
}

export const VacancyItem: FC<PropsType> = memo(({ vacancy, isCurrentVacancy }) => {
  const navigate = useNavigate()

  const navigateToVacancy = () => {
    navigate(`/vacancy/${vacancy.id}`, { state: vacancy })
  }

  return (
    <div className={styles.container}>
      <div className={styles.flexbox}>
        <div onClick={navigateToVacancy} className={styles.title}>
          {vacancy.profession}
        </div>
        <div className={styles.payment}>
          {paymentResult(vacancy.payment_from, vacancy.payment_to, vacancy.currency)}
          {' • '}
          {vacancy.type_of_work?.title}
        </div>
        {vacancy.firm_name}

        <div className={styles.location}>
          <MapPin size={20} color={'#000000'} style={{ opacity: 0.5 }} /> {vacancy.town.title}
        </div>
      </div>

      <div
        onClick={() => {
          toggleVacancyInLS(localStorageKeys.VACANCIES_LS, vacancy)
        }}
      >
        <Star color={'#ACADB9'} />
      </div>
    </div>
  )
})
