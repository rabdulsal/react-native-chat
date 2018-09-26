import _ from 'lodash';
import {
  FETCH_CONTACTS,
} from './types';
import { usersRef } from '../constants/Firebase';

export const fetchContacts = (currentUser) => {
  return (dispatch) => {
    usersRef().on('value', snapshot => {
      /* LODASH */
      // const contacts = _.map(snapshot.val(), (uid) => {
      //   return { uid };
      // });
      // dispatch({
      //   type: FETCH_CONTACTS,
      //   payload: contacts,
      // });
      /* BASIC */
      const USERS = [];
        snapshot.forEach(child => {
          const USERNAME = child.val().username;
          if (USERNAME !== currentUser) {
            USERS.push(child.val());
          }
        });
        dispatch({
          type: FETCH_CONTACTS,
          payload: USERS,
        });
      });
      // .catch(error => alert(error));
    // }); Needed for lodash technique
  };
};
