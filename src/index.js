import { configureStore } from '@reduxjs/toolkit'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

import rootReducer from './slices'
import App from './App'

import './styles/index.scss'

const store = configureStore({
    reducer: rootReducer
})
render(
    <Provider store = {store}>
        <App/>
    </Provider>,
    document.getElementById('root')
)
