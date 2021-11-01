import {
    ADD_IMAGE,
    READALL_IMAGE,
    DELETE_IMAGE
} from '../action/action-type'

const initialState = {
    images: []
}

export default function (state = initialState, action) {
    switch (action.type) {
    case ADD_IMAGE:
        return {
            images: [...state.images, ...action.payload]
        }
    case READALL_IMAGE: 
        return {
            images: [...action.payload]
        }
    case DELETE_IMAGE: 
        return {
            images: state.images.filter(img => img._id != action.payload)
        }
    default:
        return state
    }
}