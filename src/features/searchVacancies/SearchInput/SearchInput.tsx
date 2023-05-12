import { Button, Input } from '@mantine/core'
import { Search } from 'tabler-icons-react'
import { useAppDispatch, useAppSelector } from 'common/hooks/hooks'
import { ChangeEvent, FC, KeyboardEvent } from 'react'
import {
  changeCurrentPage,
  setSearchQueryParams
} from 'features/searchVacancies/searchVacancies.slice'
import { selectIsLoading } from 'app/app.selectors'
import styles from 'features/searchVacancies/SearchInput/SearchInput.module.scss'
import classNames from 'classnames'
import { useQueryParams } from 'common/hooks/useQueryParams'
import { SEARCH_PARAMS } from 'common/enums/SEARCHPARAMS'

interface PropsType {
  keyWord: string
  setKeyWord: (keyword: string) => void
}

export const SearchInput: FC<PropsType> = ({ keyWord, setKeyWord }) => {
  const dispatch = useAppDispatch()
  const isLoading = useAppSelector(selectIsLoading)
  const { setQueryParams } = useQueryParams()

  const searchByKeyWordHandler = () => {
    setQueryParams(keyWord, SEARCH_PARAMS.KEYWORD)
    dispatch(setSearchQueryParams({ keyword: keyWord ? keyWord : null }))
    dispatch(changeCurrentPage(1))
  }

  const changeTextHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setKeyWord(event.currentTarget.value)
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
      value={keyWord ?? ''}
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
