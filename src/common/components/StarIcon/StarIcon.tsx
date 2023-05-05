import React, { FC, memo } from 'react'
import { localStorageKeys } from 'common/enums/localStorageKeys'
import { Star } from 'tabler-icons-react'
import { IVacancy } from 'features/searchVacancies/searchVacancies.api'
import { useToggleFavorite } from 'common/hooks/useToggleFavorite'

interface PropsType {
  vacancy: IVacancy
}

export const StarIcon: FC<PropsType> = memo(({ vacancy }) => {
  const { isFavorite, toggleVacancyHandler } = useToggleFavorite(
    localStorageKeys.VACANCIES_LS,
    vacancy
  )

  return (
    <div
      onClick={() => {
        toggleVacancyHandler()
      }}
    >
      <Star color={isFavorite ? '#5E96FC' : '#ACADB9'} fill={isFavorite ? '#5E96FC' : '#fff'} />
    </div>
  )
})
