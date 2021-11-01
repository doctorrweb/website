import React from 'react'
import { render } from 'react-dom'
import { configureStore } from '@reduxjs/toolkit'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import jwt from 'jsonwebtoken'
import { HashRouter } from 'react-router-dom'
import App from './container/app'
import setAuthorizationToken from './helper/authToken'
// import registerServiceWorker from './registerServiceWorker'
import reducers from './reducer'
import { setAuthentication, setCurrentUser } from './action/index'

const store = configureStore({
    reducers
})

const token = localStorage.getItem('token')
if (token) {
    setAuthorizationToken(token)
    store.dispatch(setAuthentication(true))
    store.dispatch(setCurrentUser(jwt.decode(token)))
}

setAuthorizationToken(token)

render(
    <HashRouter basename='/'>
        <Provider store={store}>
            <App />
        </Provider>
    </HashRouter>,
    document.querySelector('#root')
)

// registerServiceWorker()