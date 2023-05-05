import React from 'react'
import { useVacanciesLS } from 'common/hooks/useVacanciesLS'
import { localStorageKeys } from 'common/enums/localStorageKeys'
import { Pagination } from '@mantine/core'
import { VacancyItem } from 'common/components/VacancyItem/VacancyItem'

export const Favorite = () => {
  const { data, handlePageChange, total } = useVacanciesLS(localStorageKeys.VACANCIES_LS)

  return (
    <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
      {data.length ? (
        data.map(vacancy => {
          return <VacancyItem vacancy={vacancy} key={vacancy.id} isCurrentVacancy={false} />
        })
      ) : (
        <div>empty</div>
      )}

      <Pagination
        defaultValue={1}
        onChange={page => {
          handlePageChange(page)
        }}
        total={total}
      />
    </div>
  )
}
