import { PARSE_RESPONSE, RESET_RESPONSE } from '../action/action-type'

const initialState = {
    status: null
}

export default function ResponsesReducer(state = initialState, action) {
    switch (action.type) {
    case PARSE_RESPONSE:
        return {
            status: action.payload
        }
    case RESET_RESPONSE:
        return {
            status: null
        }
    default:
        return state
    }
}
