import React from 'react'
import { Pagination } from '@mantine/core'
import { VacancyItem } from 'common/components/VacancyItem/VacancyItem'
import { usePagination } from 'common/hooks/usePagination'

export const Favorite = () => {
  const { currentData, handlePageChange, currentPage, total } = usePagination()

  return (
    <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
      {currentData.length ? (
        currentData.map(vacancy => {
          return <VacancyItem vacancy={vacancy} key={vacancy.id} isCurrentVacancy={false} />
        })
      ) : (
        <div>empty</div>
      )}

      <Pagination
        value={currentPage + 1}
        onChange={page => {
          handlePageChange(page)
        }}
        total={total}
      />
    </div>
  )
}
