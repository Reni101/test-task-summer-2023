import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import styles from 'features/currentVacancy/CurrentVacancy.module.css'
import { useAppDispatch, useAppSelector } from 'common/hooks/hooks'
import { getCurrentVacancy } from 'features/currentVacancy/currentVacancy.slice'
import { VacancyItem } from 'common/components/VacancyItem/VacancyItem'
import DOMPurify from 'dompurify'
import { selectCurrentVacancy } from 'features/currentVacancy/currentVacancy.selectors'
import { selectIsLoading } from 'app/app.selectors'

export const CurrentVacancy = () => {
  const dispatch = useAppDispatch()
  const { id } = useParams()
  const vacancy = useAppSelector(selectCurrentVacancy)
  const cleanText = DOMPurify.sanitize(vacancy.vacancyRichText)
  const isLoading = useAppSelector(selectIsLoading)

  useEffect(() => {
    if (id) {
      dispatch(getCurrentVacancy(id))
    }
  }, [dispatch, id])

  return (
    <div className={styles.container}>
      {!!Object.keys(vacancy).length && isLoading && (
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
