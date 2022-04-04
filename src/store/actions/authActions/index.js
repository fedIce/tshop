import { SIGNIN, SIGNOUT } from "../../actionTypes/authActionTypes"

export const store_user_data = (data) => {
    return (dispatch) => {
        dispatch({
            type: SIGNIN,
            payload: data,
            error: null
        })
    }
}

export const remove_user_data = () => {
    return (dispatch) => {
        dispatch({
            type: SIGNOUT,
            payload: null,
            error: null
        })
    }
}