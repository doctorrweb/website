import {
    CREATE_TRANSLATION,
    READALL_TRANSLATION,
    READ_TRANSLATION,
    UPDATE_TRANSLATION,
    DELETE_TRANSLATION,
} from '../action/action-type'

const initialState = {
    translations: [],
}

export default function (state = initialState, action) {
    switch (action.type) {
    case CREATE_TRANSLATION:
        return {
            translations: [...state.translations, action.payload],
        }
    case READALL_TRANSLATION:
        return {
            translations: [...action.payload],
        }
    case READ_TRANSLATION:
        return {
            translations: [action.payload],
        }
    case UPDATE_TRANSLATION:
        return {
            translations: [...state.translations],
        }
    case DELETE_TRANSLATION:
        return {
            translations: state.translations.filter(
                (trans) => trans._id != action.payload
            ),
        }
    default:
        return state
    }
}
