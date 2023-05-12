import { Button, Input } from '@mantine/core'
import { Search } from 'tabler-icons-react'
import { useAppDispatch, useAppSelector } from 'common/hooks/hooks'
import { FC, KeyboardEvent } from 'react'
import {
  changeCurrentPage,
  setSearchQueryParams
} from 'features/searchVacancies/searchVacancies.slice'
import { selectIsLoading } from 'app/app.selectors'
import styles from './SearchInput.module.css'

interface PropsType {
  keyWord: string
  setKeyWord: (keyword: string) => void
}

export const SearchInput: FC<PropsType> = ({ keyWord, setKeyWord }) => {
  const dispatch = useAppDispatch()
  const isLoading = useAppSelector(selectIsLoading)

  const searchByKeyWordHandler = () => {
    dispatch(setSearchQueryParams({ keyword: keyWord }))
    dispatch(changeCurrentPage(1))
  }

  const pressEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    e.key === 'Enter' && searchByKeyWordHandler()
  }

  return (
    <Input
      style={isLoading ? { pointerEvents: 'none', opacity: '0.4' } : {}}
      className={styles.container}
      data-elem='search-input'
      onKeyDown={pressEnter}
      styles={{ input: { height: '48px' } }}
      value={keyWord}
      onChange={event => {
        setKeyWord(event.currentTarget.value)
      }}
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
