import { SET_AUTHENTICATION } from '../action/action-type'

const token = localStorage.getItem('token')
const initialState = {}

if (token) {
    initialState.isLoggedIn = true
} else {
    initialState.isLoggedIn = false
}

export default function AuthenticationReducer(state = initialState, action) {
    switch (action.type) {
    case SET_AUTHENTICATION:
        return {
            isLoggedIn: action.payload
        }

    default:
        return state
    }
}
