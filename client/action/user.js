import {
    READALL_USER,
    UPDATE_USER,
    DELETE_USER,
} from './action-type'
import axios from 'axios'
import {
    parseResponse,
    parseError,
    parseRequestType,
    resetResponse,
} from './index'

const URL_API = `${process.env.BASE_URL}/api`


// use the logonUser function to create a new user

export function readAllUsers() {
    return function (dispatch) {
        axios({
            method: 'get',
            url: `${URL_API}/users`
        })
            .then((response) => {
                dispatch({
                    type: READALL_USER,
                    payload: response.data
                })
                dispatch(parseResponse(response.status))
            })

            .catch((error) => {
                dispatch(parseError(error.response))
            })
    }
}

export function updateUser(userId, updatedContent) {
    return function (dispatch) {
        dispatch(resetResponse())
        dispatch(parseRequestType('update-user'))
        axios({
            method: 'put',
            url: `${URL_API}/users/${userId}`,
            data: updatedContent,
        })
            .then((response) => {
                dispatch({
                    type: UPDATE_USER,
                    payload: userId
                })
                dispatch(parseResponse(response.status))
            })
            .catch((error) => {
                dispatch(parseError(error.response))
            })
    }
}

export function deleteUser(userId) {
    return function (dispatch) {
        axios({
            method: 'delete',
            url: `${URL_API}/users/${userId}`
        })
            .then((response) => {
                dispatch({
                    type: DELETE_USER,
                    payload: userId
                })
                dispatch(parseResponse(response.status))
            })
            .catch((error) => {
                dispatch(parseError(error.response))
            })
    }
}
