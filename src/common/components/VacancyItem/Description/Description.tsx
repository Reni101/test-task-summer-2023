import { FC, memo } from 'react'
import classNames from 'classnames'
import { paymentResult } from 'common/utils/payment'
import { MapPin } from 'tabler-icons-react'
import styles from './Descriptiom.module.css'

interface PropsType {
  isCurrentVacancy: boolean
  payment_from: number
  payment_to: number
  currency: string
  type_of_work?: { title: string }
  town: { title: string }
}

export const Description: FC<PropsType> = memo(
  ({ isCurrentVacancy, payment_to, payment_from, currency, type_of_work, town }) => {
    return (
      <>
        <div className={classNames(styles.payment, { [styles.paymentCurrent]: isCurrentVacancy })}>
          {payment_from !== 0 && payment_to !== 0 && (
            <span
              className={classNames(styles.currency, {
                [styles.currencyCurrent]: isCurrentVacancy
              })}
            >
              {paymentResult(payment_from, payment_to, currency)}
            </span>
          )}

          <span className={styles.dot}>•</span>

          <span
            className={classNames(styles.workTitle, {
              [styles.workTitleCurrent]: isCurrentVacancy
            })}
          >
            {type_of_work?.title}
          </span>
        </div>

        <div className={styles.location}>
          <MapPin size={20} color={'#000000'} /> {town.title}
        </div>
      </>
    )
  }
)
