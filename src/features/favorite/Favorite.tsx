import React from 'react'
import { Pagination } from '@mantine/core'
import { VacancyItem } from 'common/components/VacancyItem/VacancyItem'
import { usePagination } from 'common/hooks/usePagination'

export const Favorite = () => {
  const { currentData, handlePageChange, currentPage, total } = usePagination()

  return (
    <div
      style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', paddingTop: '40px' }}
    >
      {currentData.length ? (
        currentData.map(vacancy => {
          return <VacancyItem vacancy={vacancy} key={vacancy.id} isCurrentVacancy={false} />
        })
      ) : (
        <div>empty</div>
      )}

      <Pagination
        style={{ margin: '20px' }}
        value={currentPage + 1}
        onChange={page => {
          handlePageChange(page)
        }}
        total={total}
      />
    </div>
  )
}
