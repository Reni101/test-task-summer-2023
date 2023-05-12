import { Pagination } from '@mantine/core'
import { VacancyItem } from 'common/components/VacancyItem/VacancyItem'
import { usePagination } from 'common/hooks/usePagination'
import { useNavigate } from 'react-router-dom'
import { PATH } from 'common/enums/PATH'
import styles from 'features/favorite/Favorite.module.scss'

export const Favorite = () => {
  const navigate = useNavigate()
  const { currentData, setPageHandler, currentPage, totalPage, dataLength } = usePagination()

  if (!dataLength) {
    navigate(PATH.EMPTY)
  }

  return (
    <div className={styles.container}>
      {!!currentData.length &&
        currentData.map(vacancy => {
          return <VacancyItem vacancy={vacancy} key={vacancy.id} isCurrentVacancy={false} />
        })}

      <Pagination
        className={styles.pagination}
        value={currentPage}
        onChange={setPageHandler}
        total={totalPage}
      />
    </div>
  )
}
