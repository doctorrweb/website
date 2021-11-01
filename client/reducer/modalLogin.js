import { SHOW_MODALLOGIN } from '../action/action-type'

const initialState = {
    modalLogin: false
}

export default function showModalLoginReducer(state = initialState, action) {
    switch (action.type) {
    case SHOW_MODALLOGIN:
        return {
            modalLogin: action.payload
        }

    default:
        return state
    }
}
