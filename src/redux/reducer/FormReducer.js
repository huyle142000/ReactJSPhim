import { LOGIN, USER_LOGIN } from "../type/FormType";


let uLogin = null;

if (localStorage.getItem(USER_LOGIN)) {
    uLogin = JSON.parse(localStorage.getItem(USER_LOGIN));
    console.log(uLogin)
}

const initialState = {
    uLogin:uLogin
}

export const FormReducer = (state = initialState, action) => {
    switch (action.type) {

        case LOGIN:
            state.uLogin = {...action.uLogin};
            console.log(state.uLogin)
            return {...state}
        default:
            return state
    }
}
