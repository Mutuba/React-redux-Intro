// authReducer.js

import { REG_FAILED, 
    REG_SUCCESSFUL, LOGIN_FAILED, LOGIN_SUCCESSFUL, IS_FETCHING} from '../actions/types';

const initialState = {
    isAuthenticated: false,
    user: {},

    error: {
        username: undefined,
        email: undefined,
        password: undefined,
    },
    message: undefined,
    isFetching: false,
}

export default function (state = initialState, {type, payload}) {
    switch (type) {
        case IS_FETCHING:
        console.log(payload);
        return {
            ...state,
            isFetching: true,
        }

        case REG_SUCCESSFUL:
            return {
                ...state,
                isAuthenticated: false,
                error: {},
                message: payload,
            }
        case REG_FAILED:
            return {
                ...state,
                isAuthenticated: false,
                user: null,
                error: {
                    username: payload.error.username,
                    email: payload.error.email,
                    password: payload.error.password
                },
                message: undefined,
            }
        case LOGIN_SUCCESSFUL:        
            return {
                ...state,
                isAuthenticated: true,
                user: payload.user,
                error: {},
                message: undefined,
                isFetching: false,
            }
        case LOGIN_FAILED:        
            return {
                ...state,
                isAuthenticated: false,
                user: null,
                error: {
                    email: payload.email !== undefined ? payload.email[0] : undefined,
                    password:  payload.password !== undefined ? payload.password[0] : undefined,
                    error: payload.error !== undefined ? payload.error[0] : undefined,
                },
                message: undefined,
                isFetching: false,
            }
        default:
            return state;
    }
}