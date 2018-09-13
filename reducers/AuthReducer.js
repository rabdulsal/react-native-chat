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
 } from '../actions/types';

const INITIAL_STATE = {
  signinEmail: '',
  signinPassword: '',
  signupEmail: '',
  signupPassword: '',
  user: null,
  signupUsername: '',
  ERROR_RESET,
  signinIsLoading: false,
  signupIsLoading: false
};

const ERROR_RESET = {
  signinError: '',
  signupError: '',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SIGNOUT:
      return { ...INITIAL_STATE };
    // SIGNIN
    case SIGNIN_EMAIL_CHANGED:
      return { ...state, ...ERROR_RESET, signinEmail: action.payload };
    case SIGNIN_PASSWORD_CHANGED:
      return { ...state, ...ERROR_RESET, signinPassword: action.payload };
    case LOGIN_USER:
      return { ...state, signinIsLoading: true, ...ERROR_RESET };
    case SIGNIN_USER_SUCCESS:
      return { ...state, ...INITIAL_STATE, user: action.payload };
    case SIGNIN_USER_FAILED:
      return {
        ...state,
        ...INITIAL_STATE,
        signinError: action.payload,
      };

    // SIGNUP
    case SIGNUP_EMAIL_CHANGED:
      return { ...state, ...ERROR_RESET, signupEmail: action.payload };
    case SIGNUP_PASSWORD_CHANGED:
      return { ...state, ...ERROR_RESET, signupPassword: action.payload };
    case SIGNUP_USER_SUCCESS:
      return { ...state, ...INITIAL_STATE, user: action.payload };
    case SIGNUP_USER_FAILED:
      return {
        ...state,
        ...INITIAL_STATE,
        signupError: action.payload,
      };
    case CREATE_USER:
      return { ...state, signupIsLoading: true, ...ERROR_RESET };
    case SIGNUP_USERNAME_CHANGED:
      return { ...state, ...ERROR_RESET, signupUsername: action.payload };
    default: return state;
  }
};
