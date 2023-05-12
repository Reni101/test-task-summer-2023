import { useAppDispatch, useAppSelector } from 'common/hooks/hooks'
import { VacancyItem } from 'common/components/VacancyItem/VacancyItem'
import { selectTotal, selectVacancies } from 'features/searchVacancies/searchVacancies.selectors'
import { Navigate } from 'react-router-dom'
import { PATH } from 'common/enums/PATH'
import { useEffect } from 'react'
import {
  getVacancies,
  resetAllFilters,
  setTotal
} from 'features/searchVacancies/searchVacancies.slice'
import { useFirstDispatch } from 'common/hooks/useFirstDispatch'

export const Vacancies = () => {
  const dispatch = useAppDispatch()
  const vacancies = useAppSelector(selectVacancies)
  const total = useAppSelector(selectTotal)
  const { isFirstRender } = useFirstDispatch()

  useEffect(() => {
    if (!isFirstRender.current) {
      dispatch(getVacancies())
    }
  }, [isFirstRender])

  useEffect(() => {
    return () => {
      if (total === 0) {
        dispatch(resetAllFilters())
        dispatch(setTotal(null))
      }
    }
  }, [total])

  if (total === 0) {
    return <Navigate to={PATH.EMPTY} />
  }

  return (
    <>
      {vacancies?.map(vacancy => {
        return <VacancyItem vacancy={vacancy} key={vacancy.id} isCurrentVacancy={false} />
      })}
    </>
  )
}
