import { useLayoutEffect, useState } from 'react'
import { IVacancy } from 'features/searchVacancies/searchVacancies.api'
import { useAppSelector } from 'common/hooks/hooks'
import { selectFavoriteVacancies } from 'features/favorite/favorite.selectors'

export const usePagination = (itemsPerPage: number = 4) => {
  const favoriteVacancies = useAppSelector(selectFavoriteVacancies)

  const [currentPage, setCurrentPage] = useState(0)
  const [currentData, setCurrentData] = useState<IVacancy[]>([])

  const totalPage = Math.ceil(favoriteVacancies.length / itemsPerPage)

  useLayoutEffect(() => {
    const start = currentPage * itemsPerPage
    const end = start + itemsPerPage
    setCurrentData(favoriteVacancies.slice(start, end))

    if (currentPage + 1 > Math.ceil(favoriteVacancies.length / itemsPerPage)) {
      setCurrentPage(prevState => prevState - 1)
    }
  }, [currentPage, itemsPerPage, favoriteVacancies])

  const setPageHandler = (newPage: number) => {
    setCurrentPage(newPage - 1)
  }

  return {
    currentData,
    setPageHandler,
    currentPage: currentPage + 1,
    totalPage,
    dataLength: favoriteVacancies.length
  }
}
// +1 / -1 page need to synchronized pagination
