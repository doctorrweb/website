import { TOGGLE_BUTTON } from '../action/action-type'

const initialState = {
    toggleBtn: false
}

export default function toggleBtnReducer(state = initialState, action) {
    switch (action.type) {
    case TOGGLE_BUTTON:
        return {
            toggleBtn: action.payload
        }

    default:
        return state
    }
}
