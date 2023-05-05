import { IVacancy } from 'features/searchVacancies/searchVacancies.api'
import { FC, memo } from 'react'
import { paymentResult } from 'common/utils/payment'
import { MapPin } from 'tabler-icons-react'
import { useNavigate } from 'react-router-dom'
import classNames from 'classnames'
import { StarIcon } from 'common/components/StarIcon/StarIcon'
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
        <div
          onClick={navigateToVacancy}
          className={classNames(styles.title, { [styles.titleCurrent]: isCurrentVacancy })}
        >
          {vacancy.profession}
        </div>
        <div className={styles.payment}>
          {vacancy.payment_from !== 0 && vacancy.payment_to !== 0 && (
            <span className={styles.currency}>
              {paymentResult(vacancy.payment_from, vacancy.payment_to, vacancy.currency)}
            </span>
          )}
          <span className={styles.dot}>•</span>
          <span className={styles.workTitle}>{vacancy.type_of_work?.title}</span>
        </div>

        <div className={styles.location}>
          <MapPin size={20} color={'#000000'} style={{ opacity: 0.5 }} /> {vacancy.town.title}
        </div>
      </div>

      <StarIcon vacancy={vacancy} />
    </div>
  )
})
