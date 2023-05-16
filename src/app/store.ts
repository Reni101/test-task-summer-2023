import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { appReducer } from 'app/app.slice'
import { searchVacanciesReducer } from 'features/searchVacancies/searchVacancies.slice'
import { catalogsReducer } from 'features/searchVacancies/Filters/catalogs.slice'
import { authReducer } from 'features/auth/auth.slice'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { favoriteReducer } from 'features/favorite/favorite.slice'
import { currentVacancyReducer } from 'features/currentVacancy/currentVacancy.slice'

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  whitelist: ['auth', 'favorite']
}
const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer,
  searchVacancies: searchVacanciesReducer,
  catalogs: catalogsReducer,
  favorite: favoriteReducer,
  currentVacancy: currentVacancyReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})

export const persistor = persistStore(store)

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
