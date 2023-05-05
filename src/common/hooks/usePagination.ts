import { useLayoutEffect, useState } from 'react'
import { IVacancy } from 'features/searchVacancies/searchVacancies.api'
import { useAppSelector } from 'common/hooks/hooks'
import { useNavigate } from 'react-router-dom'

export const usePagination = (itemsPerPage: number = 4) => {
  const navigate = useNavigate()

  const data = useAppSelector(state => state.favorite)
  const [currentPage, setCurrentPage] = useState(0)
  const [currentData, setCurrentData] = useState<IVacancy[]>([])
  const total = Math.ceil(data.length / 4)

  useLayoutEffect(() => {
    const start = currentPage * itemsPerPage
    const end = start + itemsPerPage
    setCurrentData(data.slice(start, end))

    if (currentPage + 1 > Math.ceil(data.length / 4)) {
      setCurrentPage(prevState => prevState - 1)
    }
  }, [currentPage, itemsPerPage, data])

  if (!data.length) {
    navigate('/404')
  }

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage - 1)
  }

  return { currentData, handlePageChange, currentPage, total }
}
