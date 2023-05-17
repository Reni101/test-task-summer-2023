import { Button, Input } from '@mantine/core'
import { useAppDispatch, useAppSelector } from 'common/hooks/useAppHooks'
import { ChangeEvent, KeyboardEvent } from 'react'
import { setSearchQueryParams } from 'features/searchVacancies/searchVacancies.slice'
import { selectIsLoading } from 'app/app.selectors'
import styles from 'features/searchVacancies/SearchInput/SearchInput.module.scss'
import { useSearch } from 'common/hooks/useSearch'
import { SearchIcon } from 'common/assets/icons/SearchIcon'
import classNames from 'classnames'

export const SearchInput = () => {
  const dispatch = useAppDispatch()
  const isLoading = useAppSelector(selectIsLoading)

  const { setSearch, keywordState } = useSearch()

  const changeTextHandler = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQueryParams({ keyword: event.currentTarget.value }))
  }

  const pressEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    e.key === 'Enter' && setSearch()
  }

  return (
    <Input
      className={classNames({ [styles.disabled]: isLoading })}
      classNames={{ input: styles.input }}
      data-elem='search-input'
      onKeyDown={pressEnter}
      value={keywordState ?? ''}
      onChange={changeTextHandler}
      size='md'
      icon={<SearchIcon />}
      radius='md'
      rightSection={
        <Button
          data-elem='search-button'
          className={styles.searchButton}
          onClick={setSearch}
          radius='md'
          size='xs'
        >
          Поиск
        </Button>
      }
      placeholder='Введите название вакансии'
      rightSectionWidth={90}
    />
  )
}
