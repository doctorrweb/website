import {
    CREATE_CLIENT, 
    READALL_CLIENT,
    UPDATE_CLIENT,
    DELETE_CLIENT,
} from '../action/action-type'

const initialState = {
    clients: []
}

export default function (state = initialState, action) {
    switch (action.type) {
    case CREATE_CLIENT:
        return {
            clients: [...state.clients, action.payload]
        }
    case READALL_CLIENT:
        return {
            clients: [...action.payload]
        }
    case UPDATE_CLIENT:
        return {
            clients: [...state.clients]
        }
    case DELETE_CLIENT:
        return {
            clients: state.clients.filter(client => client._id != action.payload)
        }
    default:
        return state
    }
}