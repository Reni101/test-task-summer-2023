import { useLayoutEffect, useState } from 'react'
import { IVacancy } from 'features/searchVacancies/searchVacancies.api'
import { useAppSelector } from 'common/hooks/hooks'

export const usePagination = (itemsPerPage: number = 4) => {
  const data = useAppSelector(state => state.favorite)
  const [currentPage, setCurrentPage] = useState(0)
  const [currentData, setCurrentData] = useState<IVacancy[]>([])
  const totalPage = Math.ceil(data.length / 4)

  useLayoutEffect(() => {
    const start = currentPage * itemsPerPage
    const end = start + itemsPerPage
    setCurrentData(data.slice(start, end))

    if (currentPage + 1 > Math.ceil(data.length / 4)) {
      setCurrentPage(prevState => prevState - 1)
    }
  }, [currentPage, itemsPerPage, data])

  const setPageHandler = (newPage: number) => {
    setCurrentPage(newPage - 1)
  }

  return {
    currentData,
    setPageHandler,
    currentPage: currentPage + 1,
    totalPage,
    dataLength: data.length
  }
}
// +1 / -1 page need to synchronized pagination
