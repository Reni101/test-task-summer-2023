import { IVacancy } from 'features/searchVacancies/searchVacancies.api'
import { FC, memo } from 'react'
import { paymentResult } from 'common/utils/payment'
import { MapPin } from 'tabler-icons-react'
import classNames from 'classnames'
import { ToggleFavorite } from 'common/components/VacancyItem/ToggleFavorite/ToggleFavorite'
import { TitleVacancy } from 'common/components/VacancyItem/Title/TitleVacancy'
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

        <div className={classNames(styles.payment, { [styles.paymentCurrent]: isCurrentVacancy })}>
          {vacancy.payment_from !== 0 && vacancy.payment_to !== 0 && (
            <span
              className={classNames(styles.currency, {
                [styles.currencyCurrent]: isCurrentVacancy
              })}
            >
              {paymentResult(vacancy.payment_from, vacancy.payment_to, vacancy.currency)}
            </span>
          )}
          <span className={styles.dot}>•</span>
          <span
            className={classNames(styles.workTitle, {
              [styles.workTitleCurrent]: isCurrentVacancy
            })}
          >
            {vacancy.type_of_work?.title}
          </span>
        </div>

        <div className={styles.location}>
          <MapPin size={20} color={'#000000'} /> {vacancy.town.title}
        </div>
      </div>

      <ToggleFavorite vacancy={vacancy} />
    </div>
  )
})
