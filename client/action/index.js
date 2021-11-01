import {
    SET_AUTHENTICATION,
    SET_CURRENT_USER,
    PARSE_RESPONSE,
    PARSE_ERROR,
    PARSE_REQUESTTYPE,
    RESET_RESPONSE,
    RESET_ERROR,
    RESET_REQUESTTYPE,
    LOCALE_SET,
    SHOW_MODALLOGIN,
    SHOW_MAINMENU,
    TOGGLE_BUTTON
} from './action-type'

import axios from 'axios'
import jwt from 'jsonwebtoken'
import setAuthorizationToken from '../helper/authToken'

const URL_API = `${process.env.BASE_URL}/api`

export function setAuthentication(isLoggedIn) {
    return {
        type: SET_AUTHENTICATION,
        payload: isLoggedIn
    }
}

export const localeSet = lang => ({
    type: LOCALE_SET,
    payload: lang
})

export function setCurrentUser(user) {
    return {
        type: SET_CURRENT_USER,
        payload: user
    }
}

export function setLocale(lang) {
    return function(dispatch) {
        localStorage.alhubLang = lang
        dispatch(localeSet(lang))
    }
}

export const showModalLogin = modalLogin => ({
    type: SHOW_MODALLOGIN,
    payload: modalLogin
})

export const showMainMenu = menuVisibility => ({
    type: SHOW_MAINMENU,
    payload: menuVisibility
})

export const toggleBtn = menuVisibility => ({
    type: TOGGLE_BUTTON,
    payload: menuVisibility
})

export function parseResponse(status) {
    return {
        type: PARSE_RESPONSE,
        payload: status
    }
}

export function resetResponse() {
    return {
        type: RESET_RESPONSE
    }
}

export function parseError(status) {
    return {
        type: PARSE_ERROR,
        payload: status
    }
}

export function resetError() {
    return {
        type: RESET_ERROR
    }
}

export function parseRequestType(status) {
    return {
        type: PARSE_REQUESTTYPE,
        payload: status
    }
}

export function resetRequestType() {
    return {
        type: RESET_REQUESTTYPE
    }
}

export function loginUser(user) {
    return function(dispatch) {
        axios
            .post(`${URL_API}/signin`, user)
            .then(response => {
                const { token } = response.data
                localStorage.setItem('token', token)
                setAuthorizationToken(token)
                dispatch(setCurrentUser(jwt.decode(token)))
                dispatch(setAuthentication(true))
                dispatch(parseResponse(response.status))
            })
            .catch(error => {
                dispatch(parseError(error.response))
            })
    }
}

export function logonUser(user) {
    return function(dispatch) {
        dispatch(resetResponse())
        dispatch(parseRequestType('create-user'))
        axios
            .post(`${URL_API}/signup`, user)
            .then(response => {
                dispatch(parseResponse(response.status))
            })
            .catch(error => {
                dispatch(parseError(error.response))
            })
    }
}

export function logoutUser() {
    return function(dispatch) {
        dispatch(setAuthentication(false))
        dispatch(setCurrentUser({}))
        localStorage.removeItem('token')
    }
}