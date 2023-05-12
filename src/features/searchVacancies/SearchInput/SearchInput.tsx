import { Button, Input } from '@mantine/core'
import { Search } from 'tabler-icons-react'
import { useAppDispatch, useAppSelector } from 'common/hooks/hooks'
import { ChangeEvent, FC, KeyboardEvent } from 'react'
import { setSearchQueryParams } from 'features/searchVacancies/searchVacancies.slice'
import { selectIsLoading } from 'app/app.selectors'
import styles from 'features/searchVacancies/SearchInput/SearchInput.module.scss'
import classNames from 'classnames'
import { selectKeyWord } from 'features/searchVacancies/searchVacancies.selectors'

interface PropsType {
  onSearch: () => void
}

export const SearchInput: FC<PropsType> = ({ onSearch }) => {
  const dispatch = useAppDispatch()
  const isLoading = useAppSelector(selectIsLoading)

  const keywordState = useAppSelector(selectKeyWord)

  const searchByKeyWordHandler = () => {
    onSearch()
  }

  const changeTextHandler = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQueryParams({ keyword: event.currentTarget.value }))
  }

  const pressEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    e.key === 'Enter' && searchByKeyWordHandler()
  }

  return (
    <Input
      className={classNames(styles.container, { [styles.disabled]: isLoading })}
      data-elem='search-input'
      onKeyDown={pressEnter}
      styles={{ input: { height: '48px' } }}
      value={keywordState ?? ''}
      onChange={changeTextHandler}
      size='md'
      icon={<Search size='1.1rem' strokeWidth={1.5} />}
      radius='md'
      rightSection={
        <Button data-elem='search-button' onClick={searchByKeyWordHandler} radius='md' size='xs'>
          Поиск
        </Button>
      }
      placeholder='Введите название вакансии'
      rightSectionWidth={90}
    />
  )
}
