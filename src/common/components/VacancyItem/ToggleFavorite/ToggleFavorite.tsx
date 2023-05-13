import { FC, memo } from 'react'
import { Star } from 'tabler-icons-react'
import { IVacancy } from 'features/searchVacancies/searchVacancies.api'
import { useAppDispatch, useAppSelector } from 'common/hooks/useAppHooks'
import { toggleFavorite } from 'features/favorite/favorite.slice'
import { ActionIcon } from '@mantine/core'
import { selectIsLoading } from 'app/app.selectors'
import { selectFavoriteVacancies } from 'features/favorite/favorite.selectors'
import classNames from 'classnames'
import styles from './ToggleFavorite.module.scss'

interface PropsType {
  vacancy: IVacancy
}

export const ToggleFavorite: FC<PropsType> = memo(({ vacancy }) => {
  const dispatch = useAppDispatch()
  const isLoading = useAppSelector(selectIsLoading)
  const favVacancies = useAppSelector(selectFavoriteVacancies)

  const isFavorite = favVacancies.some(el => el.id === vacancy.id)

  const toggleFavoriteHandler = () => {
    dispatch(toggleFavorite(vacancy))
  }

  return (
    <ActionIcon
      className={isLoading ? styles.disabled : undefined}
      onClick={toggleFavoriteHandler}
      data-elem={`vacancy-${vacancy.id}-shortlist-button`}
      variant='transparent'
    >
      <Star className={classNames(styles.star, { [styles.favorite]: isFavorite })} />
    </ActionIcon>
  )
})
