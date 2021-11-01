import { SHOW_MAINMENU } from '../action/action-type'

const initialState = {
    menuVisibility: false
}

export default function showMainMenuReducer(state = initialState, action) {
    switch (action.type) {
    case SHOW_MAINMENU:
        return {
            menuVisibility: action.payload
        }

    default:
        return state
    }
}
