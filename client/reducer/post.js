import { 
    CREATE_POST,
    READALL_POST,
    READTRANSLATED_POSTS,
    READ_POST,
    UPDATE_POST,
    DELETE_POST
} from '../action/action-type'

const initialState = {
    posts: []
}

export default function (state = initialState, action) {
    switch (action.type) {
    case CREATE_POST:
        return {
            posts: [...state.posts, action.payload]
        }
    case READALL_POST:
        return {
            posts: [...action.payload]
        }
    case READTRANSLATED_POSTS:
        return {
            posts: [...action.payload]
        }
    case READ_POST:
        return {
            posts: [action.payload]
        }
    case UPDATE_POST:
        return {
            posts: [...state.posts]
        }    
    case DELETE_POST:
        return {
            posts: state.posts.filter(post => post._id != action.payload)
        }       
    default:
        return state
    }
}