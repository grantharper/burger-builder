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

const genericAuth = (email, password, endpoint) => {
  return dispatch => {
    dispatch(authStart());
    axios.post(endpoint + '?key=' + API_KEY, {
      email: email,
      password: password,
      returnSecureToken: true
    })
    .then(response => {
      console.log(response);
      const expireDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
      localStorage.setItem('token', response.data.idToken);
      localStorage.setItem('expireDate', expireDate);
      dispatch(logoutAfterExpireTime(response.data.expiresIn));
      dispatch(authSuccess(response.data));
    })
    .catch(error => {
      console.log(error);
      dispatch(authFail(error.response.data.error));
    });
  }
};

export const authSignUp = (email, password) => {
  return genericAuth(email, password,'/signupNewUser');
};

export const authSignIn = (email, password) => {
  return genericAuth(email, password,'/verifyPassword');
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