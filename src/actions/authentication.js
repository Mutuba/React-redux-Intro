// authentication.js

import axios from 'axios';
import history from '../history';
import { REG_FAILED, 
    REG_SUCCESSFUL, LOGIN_FAILED, LOGIN_SUCCESSFUL} from './types';

const regFailed = (message) => {
    return ({
        type: REG_FAILED,
        payload: {
            error: message,
        }
    });
};

const regSuccessful = () => {
    return ({
        type: REG_SUCCESSFUL,
        payload: "Please verify your email address to continue the registration.",
    });
};

export const registerUser = (user) => dispatch => {
    axios.post('http://127.0.0.1:8000/api/users/', {user: user})
        .then((res) => {
            if (res.status === 201) {
                dispatch(regSuccessful());
                history.push('/login');
            }
        })
        .catch(err => {
            dispatch(regFailed(err.response.data.errors));
        });
}

const loginFailed = (message) => {
    return ({
        type: LOGIN_FAILED,
        payload: message,
    });
}

const loginSuccessful = (user) => {
    if (user.token !== undefined) {
        localStorage.setItem('token', user.token);
        localStorage.setItem('email', user.email);
        localStorage.setItem('username', user.username);
    }
    return ({
        type: LOGIN_SUCCESSFUL,
        payload: user,
    });
}

export const loginUser = (user, history) => dispatch => {
    axios.post('http://127.0.0.1:8000/api/users/login/', {user: user})
        .then(res => {
            if (res.status === 200) {
                dispatch(loginSuccessful(res.data.user));
                history.push('/');
            }
        })
        .catch(err => {
            dispatch(loginFailed(err.response.data.errors));
        });
}

