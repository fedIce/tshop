import { DARK, LIGHT } from "../../actionTypes/themeActionTypes"

const initialState = {
    type: LIGHT,
    payload: null,
    error: null
}

export const themeReducer = ( state=initialState, action) => {
    switch(action.type){
        case LIGHT:
            return {...state, type: action.type, payload: action.payload, error: action.error }
        case DARK:
            return {...state, type: action.type, payload: action.payload, error: action.error }
        default:
            return state
    }
}