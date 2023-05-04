import { Button, Input, TextInputProps } from '@mantine/core'
import { Search } from 'tabler-icons-react'
import { useAppDispatch, useAppSelector } from 'common/hooks/hooks'
import { KeyboardEvent, useEffect, useState } from 'react'
import {
  changeCurrentPage,
  searchByKeyWord,
  setSearchParams
} from 'features/searchVacancies/searchVacancies.slice'

export const SearchInput = (props: TextInputProps) => {
  const keywordState = useAppSelector(state => state.searchVacancies.filters.keyword) as string
  const dispatch = useAppDispatch()
  const [keyWord, setKeyWord] = useState('')

  const searchByKeyWordHandler = () => {
    dispatch(setSearchParams({ keyword: keyWord }))
    dispatch(changeCurrentPage(0))
  }
  const pressEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    e.key === 'Enter' && searchByKeyWordHandler()
  }

  useEffect(() => {
    setKeyWord(keywordState)
  }, [keywordState])

  return (
    <Input
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
      {...props}
    />
  )
}
