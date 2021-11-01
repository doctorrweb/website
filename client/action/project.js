import {
    CREATE_PROJECT,
    READALL_PROJECT,
    READ_PROJECT,
    UPDATE_PROJECT,
    DELETE_PROJECT
} from './action-type'
import axios from 'axios'
import {
    parseResponse, 
    parseError,
    parseRequestType,
    resetResponse
} from './index'

const URL_API = `${process.env.BASE_URL}/api`


export function createProject(project) {
    return function (dispatch) {
        dispatch(resetResponse())
        dispatch(parseRequestType('create-project'))
        axios({
            method: 'post',
            url: `${URL_API}/projects`,
            data: project,
            //config: { headers: { 'Content-Type': 'multipart/form-data' } }
        })
            .then(response => {
                dispatch({
                    type: CREATE_PROJECT,
                    payload: response.data
                })
                dispatch(parseResponse(response.status))
            })
            .catch((error) => {
                dispatch(parseError(error.response))
            })
    }
}


export function readAllProjects() {
    return function (dispatch) {
        axios({
            method: 'get',
            url: `${URL_API}/projects`
        })
            .then((response) => {
                dispatch({
                    type: READALL_PROJECT,
                    payload: response.data
                })
            })

            .catch((error) => {
                dispatch(parseError(error.response))
            })
    }

}

export function readOneProject(projectId) {
    return function (dispatch) {
        axios({
            method: 'get',
            url: `${URL_API}/projects/${projectId}`
        })
            .then((response) => {
                dispatch({
                    type: READ_PROJECT,
                    payload: response.data
                })
            })

            .catch((error) => {
                dispatch(parseError(error.response))
            })
    }

}

export function updateProject(projectId, updatedContent) {
    return function (dispatch) {
        dispatch(resetResponse())
        dispatch(parseRequestType('update-project'))
        axios({
            method: 'put',
            url: `${URL_API}/projects/${projectId}`,
            data: updatedContent,
        })
            .then((response) => {
                dispatch({
                    type: UPDATE_PROJECT,
                    payload: projectId
                })
                dispatch(parseResponse(response.status))
            })
            .catch((error) => {
                dispatch(parseError(error.response))
            })
    }

}

export function deleteProject(projectId) {
    return function (dispatch) {
        dispatch(resetResponse())
        dispatch(parseRequestType('delete-project'))
        axios({
            method: 'delete',
            url: `${URL_API}/projects/${projectId}`
        })
            .then((response) => {
                dispatch({
                    type: DELETE_PROJECT,
                    payload: projectId
                })
                dispatch(parseResponse(response.status))
            })
            .catch((error) => {
                dispatch(parseError(error.response))
            })
    }

}
