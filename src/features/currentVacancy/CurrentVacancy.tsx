import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import styles from 'features/currentVacancy/CurrentVacancy.module.css'
import { useAppDispatch, useAppSelector } from 'common/hooks/hooks'
import { getCurrentVacancy } from 'features/currentVacancy/currentVacancy.slice'
import { VacancyItem } from 'common/components/VacancyItem/VacancyItem'
import DOMPurify from 'dompurify'

export const CurrentVacancy = () => {
  const dispatch = useAppDispatch()
  const { id } = useParams()
  const vacancy = useAppSelector(state => state.currentVacancy)
  const cleanText = DOMPurify.sanitize(vacancy.vacancyRichText)

  useEffect(() => {
    if (id) {
      dispatch(getCurrentVacancy(id))
    }
  }, [id])

  return (
    <div className={styles.container}>
      {Object.keys(vacancy).length && (
        <>
          <VacancyItem vacancy={vacancy} key={vacancy.id} isCurrentVacancy={true} />

          <div
            className={styles.descriptionContainer}
            dangerouslySetInnerHTML={{ __html: cleanText }}
          ></div>
        </>
      )}
    </div>
  )
}
