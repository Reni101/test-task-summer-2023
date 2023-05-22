import { Notifications } from '@mantine/notifications'
import { notifications } from '@mantine/notifications'
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from 'common/hooks/useAppHooks'
import { selectError } from 'app/app.selectors'
import { clearError } from 'app/app.slice'

export const ErrorNotification = () => {
  const dispatch = useAppDispatch()
  const error = useAppSelector(selectError)

  useEffect(() => {
    if (error) {
      notifications.show({
        message: error,
        autoClose: 3000,
        title: 'Error',
        color: 'red'
      })
    }
    dispatch(clearError())
  }, [error])

  return <Notifications position='top-right' />
}
