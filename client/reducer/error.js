import { PARSE_ERROR, RESET_ERROR } from '../action/action-type'

const initialState = {
    status: null
}

export default function ErrorsReducer(state = initialState, action) {
    switch (action.type) {
    case PARSE_ERROR:
        return {
            status: action.payload
        }
    case RESET_ERROR:
        return {
            status: null
        }
    default:
        return state
    }
}
