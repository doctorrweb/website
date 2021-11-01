import {
    CREATE_PROJECT,
    READALL_PROJECT,
    READ_PROJECT,
    UPDATE_PROJECT,
    DELETE_PROJECT
} from '../action/action-type'

const initialState = {
    projects: []
}

export default function (state = initialState, action) {
    switch (action.type) {
    case CREATE_PROJECT:
        return {
            projects: [...state.projects, action.payload]
        }
    case READALL_PROJECT:
        return {
            projects: [...action.payload]
        }
    case READ_PROJECT:
        return {
            projects: [action.payload]
        }
    case UPDATE_PROJECT:
        return {
            projects: [...state.projects]
        }
    case DELETE_PROJECT:
        return {
            projects: state.projects.filter(project => project._id != action.payload)
        }
    default:
        return state
    }
}