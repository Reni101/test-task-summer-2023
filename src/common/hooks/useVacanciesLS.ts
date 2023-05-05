import { useLayoutEffect, useState } from 'react'
import { IVacancy } from 'features/searchVacancies/searchVacancies.api'

export const useVacanciesLS = (key: string, itemsPerPage: number = 4) => {
  const [page, setPage] = useState(1)
  const [data, setData] = useState<IVacancy[]>([])
  const [total, setTotal] = useState<number>(1)

  useLayoutEffect(() => {
    const storedData = (JSON.parse(localStorage.getItem(key)!) || []) as IVacancy[]
    const start = (page - 1) * itemsPerPage
    const end = start + itemsPerPage
    setData(storedData.slice(start, end))
    setTotal(Math.ceil(storedData.length / itemsPerPage))
  }, [key, page, itemsPerPage])

  const handlePageChange = (newPage: number) => {
    setPage(newPage)
  }

  return { data, handlePageChange, total }
}
