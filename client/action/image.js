import {
    ADD_IMAGE,
    READALL_IMAGE,
    DELETE_IMAGE
} from './action-type'
import axios from 'axios'
import {
    parseResponse, 
    parseError, 
    parseRequestType,
    resetResponse
} from './index'

const URL_API = `${process.env.BASE_URL}/api`


export function addImage(images) {
    return function (dispatch) {
        dispatch(resetResponse())
        dispatch(parseRequestType('add-image'))
        axios({
            method: 'post',
            url: `${URL_API}/images`,
            data: images,
            config: { headers: { 'Content-Type': 'multipart/form-data' } }
        })
            .then(response => {
                dispatch({
                    type: ADD_IMAGE,
                    payload: response.data
                })
                dispatch(parseResponse(response.status))
            })
            .catch((error) => {
                dispatch(parseError(error.response))
            })
    }
}

export function readAllImages() {
    return function (dispatch) {
        axios({
            method: 'get',
            url: `${URL_API}/images`
        })
            .then((response) => {
                dispatch({
                    type: READALL_IMAGE,
                    payload: response.data
                })
                dispatch(parseResponse(response.status))
            })

            .catch((error) => {
                dispatch(parseError(error.response))
            })
    }

}


export function deleteImage(imageId) {
    return function (dispatch) {
        dispatch(resetResponse())
        dispatch(parseRequestType('delete-image'))
        axios({
            method: 'delete',
            url: `${URL_API}/images/${imageId}`
        })
            .then((response) => {
                dispatch({
                    type: DELETE_IMAGE,
                    payload: imageId
                })
                dispatch(parseResponse(response.status))
            })
            .catch((error) => {
                dispatch(parseError(error.response))
            })
    }

}
