import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import './index.css'
import { persistor, store } from 'app/store'
import { App } from 'app/App'
import { HashRouter } from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react'
import reportWebVitals from './reportWebVitals'

const container = document.getElementById('root')!
const root = createRoot(container)

root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <HashRouter>
        <App />
      </HashRouter>
    </PersistGate>
  </Provider>
)

reportWebVitals()
