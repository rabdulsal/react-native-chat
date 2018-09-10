import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
// NOTE: Messages Reducer?

export default combineReducers({
  auth: AuthReducer,
});
