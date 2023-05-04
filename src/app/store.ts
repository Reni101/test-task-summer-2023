import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import { appReducer } from 'app/app.slice'
import { searchVacanciesReducer } from 'features/searchVacancies/searchVacancies.slice'
import { catalogsReducer } from 'features/searchVacancies/Filters/catalogs.slice'
import { authReducer } from 'features/auth/auth.slice'

export const store = configureStore({
  reducer: {
    app: appReducer,
    auth: authReducer,
    searchVacancies: searchVacanciesReducer,
    catalogs: catalogsReducer
  }
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

// @ts-ignore
window.store = store
