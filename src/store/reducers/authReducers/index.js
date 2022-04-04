import { SIGNIN, SIGNOUT } from "../../actionTypes/authActionTypes"

const initialState = {
    action: SIGNOUT,
    data: null,
    error: null
}

export const authReducer = ( state=initialState, action) => {
    switch(action.type){
        case SIGNOUT:
            return {...state, action: action.type, data: action.payload, error: action.error }
        case SIGNIN:
            return {...state, action: action.type, data: action.payload, error: action.error }
        default:
            return state
    }
}