import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import MainReducer from './MainReducer';
import ContactsReducer from './ContactsReducer';
// NOTE: Messages Reducer?

export default combineReducers({
  auth: AuthReducer,
  main: MainReducer,
  contacts: ContactsReducer,
});
