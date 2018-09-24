import _ from 'lodash';
import {
  FETCH_CONTACTS,
} from './types';
import { USERS_REF } from '../constants/Firebase';

export const fetchContacts = () => {
  console.log('Fetch Contacts');
  return (dispatch) => {
    USERS_REF.on('value', snapshot => {
      /* LODASH */
      // const contacts = _.map(snapshot.val(), (uid) => {
      //   return { uid };
      // });
      // dispatch({
      //   type: FETCH_CONTACTS,
      //   payload: contacts,
      // });
      /* BASIC */
      var usrs = [];
        snapshot.forEach(child => {
          usrs.push(child.val())
        });
        dispatch({
          type: FETCH_CONTACTS,
          payload: usrs,
        });
      });
      // .catch(error => alert(error));
    // }); Needed for lodash technique
  };
};
