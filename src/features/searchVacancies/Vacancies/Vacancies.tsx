import { useAppDispatch, useAppSelector } from 'common/hooks/hooks'
import { VacancyItem } from 'common/components/VacancyItem/VacancyItem'
import {
  selectCurrentPage,
  selectFilters,
  selectTotal,
  selectVacancies
} from 'features/searchVacancies/searchVacancies.selectors'
import { Navigate } from 'react-router-dom'
import { PATH } from 'common/enums/PATH'
import { useEffect } from 'react'
import {
  getVacancies,
  resetAllFilters,
  setTotal
} from 'features/searchVacancies/searchVacancies.slice'

export const Vacancies = () => {
  const dispatch = useAppDispatch()
  const vacancies = useAppSelector(selectVacancies)
  const total = useAppSelector(selectTotal)
  const filters = useAppSelector(selectFilters)
  const currentPage = useAppSelector(selectCurrentPage)

  // const isFirst = useRef(true)
  //
  // useEffect(() => {
  //   if (isFirst.current) {
  //     debugger
  //     isFirst.current = false
  //   }
  // }, [])

  useEffect(() => {
    dispatch(getVacancies())
  }, [currentPage, filters, dispatch])

  useEffect(() => {
    return () => {
      if (total === 0) {
        dispatch(resetAllFilters())
        dispatch(setTotal(null))
      }
    }
  }, [dispatch, total])

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
