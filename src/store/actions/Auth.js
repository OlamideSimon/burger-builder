import * as actionType from './actionTypes';
import axios from 'axios'

export const authStart = () => {
    return {
        type: actionType.AUTH_START
    }
};

export const authSuccess = (token, userId) => {
    return {
        type: actionType.AUTH_SUCCESS,
        idToken: token,
        userId: userId
    }
};

export const authFail = (error) => {
    return {
        type: actionType.AUTH_FAIL,
        error: error
    }
}

export const logout = () => {
    return {
        type: actionType.AUTH_LOGOUT
    }
}

export const authLogout = (displayTime) => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return dispatch => {
        setTimeout(() => {
            dispatch(logout())
        }, displayTime * 1000);
    }
}

export const auth = (email, password, isSignup) => {
    return dispatch => {
        dispatch(authStart());
        const loginDetails = {
            email: email,
            password: password,
            returnSecureToken: true
        };
        let url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCkzk8pQfD0YgJzlAm8u0a58Th3kzpzy9c";
        if(!isSignup) {
            url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCkzk8pQfD0YgJzlAm8u0a58Th3kzpzy9c"
        }
        axios.post(url, loginDetails)
        .then(res => {
            console.log(res.data)
            const expirationDate = new Date(new Date().getTime + res.data.expiresIn * 1000)
            localStorage.setItem('token', String(res.data.idToken));
            localStorage.setItem('expirationDate', String(expirationDate));
            localStorage.setItem('userId', res.data.localId);
            dispatch(authSuccess(res.data.idToken, res.data.localId));
            dispatch(authLogout(res.data.expiresIn))
        })
        .catch(err => {
            dispatch(authFail(err.response.data.error));
        })
    }
}

export const setAuthRedirectPath = (path) => {
    return {
        type: actionType.SET_AUTH_REDIRECT_PATH,
        path: path
    }
}

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        const expirationDate = new Date(localStorage.getItem('expirationDate'));
        const userId = localStorage.getItem('userId')
        if (!token) {
            dispatch(logout());
        } else {
            if (expirationDate > new Date()) {
                dispatch(authSuccess(token, userId));
                dispatch(authLogout((expirationDate.getTime() - new Date().getTime())/1000))
            } else {
                dispatch(logout())
            }
        }
    }
}