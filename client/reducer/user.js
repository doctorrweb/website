import { 
    SET_CURRENT_USER,
    CREATE_USER,
    READALL_USER,
    UPDATE_USER,
    DELETE_USER
} from '../action/action-type'

const initialUser = {
    user: {}
}
const initialState = {
    users: []
}

export const SetCurrentUserReducer =(state = initialUser, action) => {
    switch (action.type) {
    case SET_CURRENT_USER:
        return {
            user: action.payload
        }
    default:
        return state
    }
}

export const UserReducer = (state = initialUser, action) => {
    switch (action.type) {
    case CREATE_USER:
        return {
            users: [...state.users, action.payload]
        }
    case READALL_USER:
        return {
            users: [...action.payload]
        }
    case UPDATE_USER:
        return {
            users: [...state.users]
        }
    case DELETE_USER:
        return {
            users: state.users.filter(user => user._id != action.payload)
        }
    default:
        return state
    }
}
