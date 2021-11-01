import { LOCALE_SET } from '../action/action-type'

const initialState = {
    lang: 'en'
}
export default function LocaleReducer(state = initialState, action = {}) {
    switch (action.type) {
    case LOCALE_SET:
        return {
            lang: action.payload
        }
    default:
        return state
    }
}
