import { setSearchQueryParams } from 'features/searchVacancies/searchVacancies.slice'
import { Select } from '@mantine/core'
import { useAppDispatch, useAppSelector } from 'common/hooks/useAppHooks'
import { selectCatalogs } from 'features/searchVacancies/Filters/catalogs.slice'
import { selectCategory } from 'features/searchVacancies/searchVacancies.selectors'
import { ArrowIcon } from 'common/assets/icons/ArrowIcon'
import styles from './SelectContainer.module.scss'

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
    <>
      <div className={styles.title}>Отрасль</div>
      <Select
        data-elem='industry-select'
        placeholder='Выберете отрасль'
        searchable
        clearable
        classNames={{ input: styles.selectContainer, rightSection: styles.rightSection }}
        rightSection={<ArrowIcon width={'15px'} height={'8px'} />}
        onChange={changeCategoryHandler}
        rightSectionWidth={40}
        value={categoryState}
        data={dataForSelect}
      />
    </>
  )
}
