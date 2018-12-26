import * as actionTypes from './actionTypes';
import axios from '../../axios-auth';
import {API_KEY} from '../../auth-constants'

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  }
};

export const authSuccess = (authData) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    userId: authData.localId,
    token: authData.idToken
  }
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  }
};

export const authSignUp = (email, password) => {
  return dispatch => {
    dispatch(authStart());
    console.log('call sign up endpoint');
    axios.post('/signupNewUser?key=' + API_KEY, {
      email: email,
      password: password,
      returnSecureToken: true
    })
    .then(response => {
      console.log(response);
      dispatch(authSuccess(response.data));
    })
    .catch(error => {
      console.log(error);
      dispatch(authFail(error));
    });
  }
};

export const authSignIn = (email, password) => {
  return dispatch => {
    dispatch(authStart());
    console.log('call authentication endpoint');
    axios.post('/verifyPassword?key=' + API_KEY, {
      email: email,
      password: password,
      returnSecureToken: true
    })
    .then(response => {
      console.log(response);
      dispatch(logoutAfterExpireTime(response.data.expiresIn));
      dispatch(authSuccess(response.data));
    })
    .catch(error => {
      console.log(error);
      dispatch(authFail(error.response.data.error));
    });
  }
};

export const authLogout = () => {
  console.log('logging the user out');
  return {
    type: actionTypes.AUTH_LOGOUT
  }
};

export const logoutAfterExpireTime = (expireSeconds) => {
  return dispatch => {
    setTimeout(() => {
      dispatch(authLogout());
      },1000 * expireSeconds);
  }
};