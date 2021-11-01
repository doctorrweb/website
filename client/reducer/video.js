import {
    ADD_VIDEO,
    READALL_VIDEO,
    DELETE_VIDEO
} from '../action/action-type'

const initialState = {
    videos: []
}

export default function (state = initialState, action) {
    switch (action.type) {
    case ADD_VIDEO:
        return {
            videos: [...state.videos, ...action.payload]
        }
    case READALL_VIDEO:
        return {
            videos: [...action.payload]
        }
    case DELETE_VIDEO:
        return {
            videos: state.videos.filter(video => video._id != action.payload)
        }
    default:
        return state
    }
}