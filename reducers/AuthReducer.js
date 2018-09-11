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
 } from '../actions/types';

const INITIAL_STATE = {
  signinEmail: '',
  signinPassword: '',
  signupEmail: '',
  signupPassword: '',
  user: null,
  signupUsername: '',
  error: '',
  loading: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    // SIGNIN
    case SIGNIN_EMAIL_CHANGED:
      return { ...state, signinEmail: action.payload };
    case SIGNIN_PASSWORD_CHANGED:
      return { ...state, signinPassword: action.payload };
    case LOGIN_USER:
      return { ...state, loading: true, error: '' };
    case SIGNIN_USER_SUCCESS:
      return { ...state, ...INITIAL_STATE, user: action.payload };
    case SIGNIN_USER_FAILED:
      return {
        ...state,
        loading: false,
        error: 'Login Failed!',
        password: '',
      };

    // SIGNUP
    case SIGNUP_EMAIL_CHANGED:
      return { ...state, signupEmail: action.payload };
    case SIGNUP_PASSWORD_CHANGED:
      return { ...state, signupPassword: action.payload };
    case SIGNUP_USER_SUCCESS:
      return { ...state, ...INITIAL_STATE, user: action.payload };
    case SIGNUP_USER_FAILED:
      return {
        ...state,
        loading: false,
        error: 'Create User Failed!',
        password: '',
      };
    case CREATE_USER:
      return { ...state, loading: true, error: '' };
    case SIGNUP_USERNAME_CHANGED:
      return { ...state, signupUsername: action.payload };
    default: return state;
  }
};
