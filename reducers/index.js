import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import MainReducer from './MainReducer';
// NOTE: Messages Reducer?

export default combineReducers({
  auth: AuthReducer,
  main: MainReducer,
});
