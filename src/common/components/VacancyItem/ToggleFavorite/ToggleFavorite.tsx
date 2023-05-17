import React, { FC, memo } from 'react'
import { IVacancy } from 'features/searchVacancies/searchVacancies.api'
import { useAppDispatch, useAppSelector } from 'common/hooks/useAppHooks'
import { toggleFavorite } from 'features/favorite/favorite.slice'
import { ActionIcon } from '@mantine/core'
import { selectFavoriteVacancies } from 'features/favorite/favorite.selectors'
import classNames from 'classnames'

import { StarIcon } from 'common/assets/icons/StarIcon'
import styles from './ToggleFavorite.module.scss'

interface PropsType {
  vacancy: IVacancy
}

export const ToggleFavorite: FC<PropsType> = memo(({ vacancy }) => {
  const dispatch = useAppDispatch()
  const favVacancies = useAppSelector(selectFavoriteVacancies)

  const isFavorite = favVacancies.some(el => el.id === vacancy.id)

  const toggleFavoriteHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    dispatch(toggleFavorite(vacancy))
  }

  return (
    <ActionIcon
      onClick={toggleFavoriteHandler}
      data-elem={`vacancy-${vacancy.id}-shortlist-button`}
      variant='transparent'
    >
      <StarIcon className={classNames(styles.star, { [styles.favorite]: isFavorite })} />
    </ActionIcon>
  )
})
