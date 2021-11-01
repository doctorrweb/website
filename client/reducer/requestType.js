import { PARSE_REQUESTTYPE, RESET_REQUESTTYPE } from '../action/action-type'

const initialState = {
    status: null
}

export default function RRequestTypeReducer(state = initialState, action) {
    switch (action.type) {
    case PARSE_REQUESTTYPE:
        return {
            status: action.payload
        }
    case RESET_REQUESTTYPE:
        return {
            status: null
        }
    default:
        return state
    }
}
