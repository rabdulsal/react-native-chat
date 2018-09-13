import Validator from 'validator';
import AuthService from '../components/AuthService';
import {
  SIGNIN_EMAIL_CHANGED,
  SIGNIN_PASSWORD_CHANGED,
  SIGNIN_USER_SUCCESS,
  SIGNIN_USER_FAILED,
  LOGIN_USER,
  SIGNUP_USERNAME_CHANGED,
  CREATE_USER,
  SIGNUP_EMAIL_CHANGED,
  SIGNUP_PASSWORD_CHANGED,
  SIGNUP_USER_SUCCESS,
  SIGNUP_USER_FAILED,
  SIGNOUT,
} from './types';

export const signinEmailChanged = text => {
  return {
    type: SIGNIN_EMAIL_CHANGED,
    payload: text
  };
};

export const signinPasswordChanged = text => {
  return {
    type: SIGNIN_PASSWORD_CHANGED,
    payload: text
  };
};

export const signupEmailChanged = text => {
  return {
    type: SIGNUP_EMAIL_CHANGED,
    payload: text
  };
};

export const signupPasswordChanged = text => {
  return {
    type: SIGNUP_PASSWORD_CHANGED,
    payload: text
  };
};

export const signupUsernameChanged = text => {
  return {
    type: SIGNUP_USERNAME_CHANGED,
    payload: text
  };
};

export const signout = () => {
  return (dispatch) => {
    AuthService.shared.signout();
    dispatch({ type: SIGNOUT });
  };
};

export const loginUser = ({ signinEmail, signinPassword }) => {
  return (dispatch) => {
    dispatch({ type: LOGIN_USER });
    // Validate & use AuthService stuff here
    if (Validator.isEmail(signinEmail) && signinPassword.trim()) {
      AuthService.shared.loginUser(signinEmail, signinPassword)
      .then(user => loginUserSuccess(dispatch, user))
      .catch(error => signinUserFailed(dispatch, error));
    } else {
      const ERROR_MESSAGE = 'There was an error validating your Email or Password';
      signinUserFailed(dispatch, ERROR_MESSAGE);
    }
  };
};

export const createUser = ({ signupEmail, signupUsername, signupPassword }) => {
  return (dispatch) => {
    dispatch({ type: CREATE_USER });
    if (Validator.isEmail(signupEmail) && signupUsername.trim() && signupPassword.trim()) {
      AuthService.shared.createNewUser(signupEmail, signupUsername, signupPassword)
      .then(user => loginUserSuccess(dispatch, user))
      .catch(error => signinUserFailed(dispatch, error));
    } else {
      const ERROR_MESSAGE = 'There was an error validating your Email, Username or Password';
      signinUserFailed(dispatch, ERROR_MESSAGE);
    }
  };
};

export const loginUserSuccess = (dispatch, user) => {
  dispatch({
    type: SIGNIN_USER_SUCCESS || SIGNUP_USER_SUCCESS,
    payload: user
  });
};

const signinUserFailed = (dispatch, error) => {
  dispatch({
    type: SIGNIN_USER_FAILED || SIGNUP_USER_FAILED,
    payload: error
  });
};
