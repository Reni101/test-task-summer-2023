import React, { FC, memo } from 'react'
import { Star } from 'tabler-icons-react'
import { IVacancy } from 'features/searchVacancies/searchVacancies.api'
import { useAppDispatch, useAppSelector } from 'common/hooks/hooks'
import { toggleFavorite } from 'features/favorite/favorite.slice'
import { ActionIcon } from '@mantine/core'

interface PropsType {
  vacancy: IVacancy
}

export const StarIcon: FC<PropsType> = memo(({ vacancy }) => {
  const dispatch = useAppDispatch()
  const favVacancies = useAppSelector(state => state.favorite)
  const isFavorite = favVacancies.some(el => el.id === vacancy.id)
  const status = useAppSelector(state => state.app.status)
  return (
    <div
      onClick={() => {
        dispatch(toggleFavorite(vacancy))
      }}
    >
      <ActionIcon
        variant='transparent'
        sx={{
          '&[data-disabled]': { opacity: 0.5 }
        }}
        disabled={status === 'loading'}
      >
        <Star
          style={{ cursor: 'pointer' }}
          color={isFavorite ? '#5E96FC' : '#ACADB9'}
          fill={isFavorite ? '#5E96FC' : '#fff'}
        />
      </ActionIcon>
    </div>
  )
})
