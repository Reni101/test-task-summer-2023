import { ChevronDown } from 'tabler-icons-react'
import { setSearchQueryParams } from 'features/searchVacancies/searchVacancies.slice'
import { Select } from '@mantine/core'
import { useAppDispatch, useAppSelector } from 'common/hooks/useAppHooks'
import { selectCatalogs } from 'features/searchVacancies/Filters/catalogs.slice'
import { selectCategory } from 'features/searchVacancies/searchVacancies.selectors'

export const SelectContainer = () => {
  const dispatch = useAppDispatch()
  const catalogs = useAppSelector(selectCatalogs)
  const categoryState = useAppSelector(selectCategory)

  const dataForSelect = catalogs.map(catalog => ({
    value: catalog.key.toString(),
    label: catalog.title
  }))

  const changeCategoryHandler = (value: string) => {
    dispatch(setSearchQueryParams({ catalogues: value }))
  }

  return (
    <Select
      data-elem='industry-select'
      placeholder='Выберете отрасль'
      searchable
      clearable
      styles={{
        rightSection: { pointerEvents: 'none' },
        input: { height: '42px', borderRadius: '8px', marginBottom: '20px' }
      }}
      rightSection={<ChevronDown size={25} strokeWidth={1.5} color={'#acadb9'} />}
      onChange={changeCategoryHandler}
      rightSectionWidth={40}
      value={categoryState}
      data={dataForSelect}
    />
  )
}
