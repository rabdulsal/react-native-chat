import Validator from 'validator';
import AuthService from '../components/AuthService';
import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  USERNAME_CHANGED,
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILED
} from './types';

export const emailChanged = text => {
  return {
    type: EMAIL_CHANGED,
    payload: text
  };
};

export const passwordChanged = text => {
  return {
    type: PASSWORD_CHANGED,
    payload: text
  };
};

export const loginUser = ({ email, password }) => {
  return (dispatch) => {
    dispatch({ type: LOGIN_USER });
    // Validate & use AuthService stuff here
    if (Validator.isEmail(email) && password.trim()) {
      AuthService.shared.loginUser(email, password)
      .then(user => loginUserSuccess(dispatch, user))
      .catch(error => console.log(`AuthActions Error ${error}`));
    } else {
      alert('There was an error validating your Email, Username or Password');
    }
  };
};

export const loginUserSuccess = (dispatch, user) => {
  dispatch({
    type: LOGIN_USER_SUCCESS,
    payload: user
  });
};

const loginUserFailed = dispatch => {
  dispatch({
    type: LOGIN_USER_FAILED
  });
};

// TODO: USERNAME_CHANGED Action here
