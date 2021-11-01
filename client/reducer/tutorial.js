import {
    CREATE_TUTORIAL, 
    READALL_TUTORIAL, 
    READ_TUTORIAL,
    UPDATE_TUTORIAL, 
    DELETE_TUTORIAL
} from '../action/action-type'

const initialState = {
    tutorials: []
}

export default function (state = initialState, action) {
    switch (action.type) {
    case CREATE_TUTORIAL:
        return {
            tutorials: [...state.tutorials, action.payload]
        }
    case READALL_TUTORIAL:
        return {
            tutorials: [...action.payload]
        }
    case READ_TUTORIAL:
        return {
            tutorials: [action.payload]
        }
    case UPDATE_TUTORIAL:
        return {
            tutorials: [...state.tutorials]
        }
    case DELETE_TUTORIAL:
        return {
            tutorials: state.tutorials.filter(tuto => tuto._id != action.payload)
        }
    default:
        return state
    }
}