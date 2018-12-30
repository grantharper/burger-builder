import * as actionTypes from './actionTypes';
import axios from '../../axios-auth';
import * as authConstants from '../../auth-constants'
import {LOCAL_STORAGE_EXPIRE_DATE_KEY, LOCAL_STORAGE_TOKEN_KEY, LOCAL_STORAGE_USER_ID_KEY} from "../../auth-constants";

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
    axios.post(endpoint + '?key=' + authConstants.API_KEY, {
      email: email,
      password: password,
      returnSecureToken: true
    })
    .then(response => {
      console.log(response);
      const expireDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
      localStorage.setItem(authConstants.LOCAL_STORAGE_TOKEN_KEY, response.data.idToken);
      localStorage.setItem(authConstants.LOCAL_STORAGE_EXPIRE_DATE_KEY, expireDate.toString());
      localStorage.setItem(authConstants.LOCAL_STORAGE_USER_ID_KEY, response.data.localId);
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
  localStorage.removeItem(authConstants.LOCAL_STORAGE_TOKEN_KEY);
  localStorage.removeItem(authConstants.LOCAL_STORAGE_EXPIRE_DATE_KEY);
  localStorage.removeItem(authConstants.LOCAL_STORAGE_USER_ID_KEY);
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

export const authCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);
    if(!token) {
      dispatch(authLogout());
    }else{

      console.log('checking local storage for auth state');
      const expireDate = new Date(localStorage.getItem(LOCAL_STORAGE_EXPIRE_DATE_KEY));
      console.log('local storage expireDate=' + expireDate);
      const userId = localStorage.getItem(LOCAL_STORAGE_USER_ID_KEY);
      if(new Date().getTime() < expireDate){
        dispatch(logoutAfterExpireTime(expireDate.getTime() - new Date().getTime()));
        dispatch(authSuccess({
          localId: userId,
          idToken: token
        }));
      }
    }
  }
};