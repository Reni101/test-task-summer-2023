import { Button, Input } from '@mantine/core'
import { Search } from 'tabler-icons-react'
import { useAppDispatch, useAppSelector } from 'common/hooks/hooks'
import { KeyboardEvent, useEffect, useState } from 'react'
import { changeCurrentPage, setSearchParams } from 'features/searchVacancies/searchVacancies.slice'
import styles from './SearchInput.module.css'

export const SearchInput = () => {
  const dispatch = useAppDispatch()

  const keywordState = useAppSelector(state => state.searchVacancies.filters.keyword)

  const [keyWord, setKeyWord] = useState('')

  const searchByKeyWordHandler = () => {
    dispatch(setSearchParams({ keyword: keyWord }))
    dispatch(changeCurrentPage(0))
  }
  const pressEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    e.key === 'Enter' && searchByKeyWordHandler()
  }

  useEffect(() => {
    if (keywordState === null) {
      setKeyWord('')
    }
  }, [keywordState])

  return (
    <Input
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
