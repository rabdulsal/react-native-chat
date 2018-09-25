import Validator from 'validator';
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
  VERIFYING_AUTHENTICATION,
  USER_NOT_AUTHENTICATED,
} from './types';
import { authRef, usersRef } from '../constants/Firebase';

// SIGNIN / SIGNUP
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

// HELPERS
const userId = () => {
  return (authRef().currentUser || {}).uid;
};

const fetchUserInfo = () => {
  return new Promise((resolve, reject) => {
    usersRef().child(userId())
    .on('value', snapshot => {
      const usr = snapshot.val();
      resolve(usr);
    });
  });
};

const updateUserInfo = ({ email, username }) => {
  return new Promise((resolve, reject) => {
    usersRef().child(userId())
    .set({ email, username })
    .then(() => fetchUserInfo()
      .then(user => resolve(user))
      .catch(error => reject(error)))
    .catch(error => reject(error));
  });
};

export const signout = () => {
  return (dispatch) => {
    authRef().signOut();
    dispatch({ type: SIGNOUT });
    userNotAuthenticated(dispatch);
  };
};

export const checkAuthentication = () => {
  return (dispatch) => {
    dispatch({ type: VERIFYING_AUTHENTICATION });
    authRef().onAuthStateChanged(user => {
      if (user) {
        fetchUserInfo()
        .then(usr => {
          loginUserSuccess(dispatch, usr);
        })
        .catch(() => signinUserFailed('Fetch User Error'));
      } else {
        userNotAuthenticated(dispatch);
      }
    });
  };
};

export const loginUser = ({ signinEmail, signinPassword }) => {
  return (dispatch) => {
    dispatch({ type: LOGIN_USER });
    // Validate & use AuthService stuff here
    if (Validator.isEmail(signinEmail) && signinPassword.trim()) {
      authRef().signInWithEmailAndPassword(signinEmail, signinPassword)
      .then(() => {
        fetchUserInfo()
        .then(user => loginUserSuccess(dispatch, user))
        .catch(error => signinUserFailed(dispatch, error));
      })
      .catch((error) => signinUserFailed(dispatch, error));
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
      authRef().createUserWithEmailAndPassword(signupEmail, signupPassword)
      .then(() => updateUserInfo({ email: signupEmail, username: signupUsername })
        .then(user => loginUserSuccess(dispatch, user))
        .catch(error => signinUserFailed(dispatch, error)))
      .catch(error => signinUserFailed(dispatch, error));
    } else {
      const ERROR_MESSAGE = 'There was an error validating your Email, Username or Password';
      signinUserFailed(dispatch, ERROR_MESSAGE);
    }
  };
};

const userNotAuthenticated = dispatch => {
  dispatch({ type: USER_NOT_AUTHENTICATED });
};

const loginUserSuccess = (dispatch, user) => {
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
