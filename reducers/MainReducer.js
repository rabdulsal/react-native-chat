import {
  USER_NOT_AUTHENTICATED,
  SIGNIN_USER_SUCCESS,
  SIGNIN_USER_FAILED,
  VERIFYING_AUTHENTICATION,
} from '../actions/types';

const INITIAL_STATE = {
  isLoading: false,
  user: null,
  error: '',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case VERIFYING_AUTHENTICATION:
      return { ...INITIAL_STATE, isLoading: true };
    case USER_NOT_AUTHENTICATED:
      return { ...state, ...INITIAL_STATE, isLoading: false };
    case SIGNIN_USER_SUCCESS:
      return { ...state, ...INITIAL_STATE, user: action.payload };
    case SIGNIN_USER_FAILED:
      return {
        ...INITIAL_STATE,
        signupError: action.payload,
      };
    default: return state;
  }
};
