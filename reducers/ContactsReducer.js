import { FETCH_CONTACTS } from '../actions/types';

const INITIAL_STATE = {
  contacts: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_CONTACTS:
      return { contacts: action.payload };
    default: return state;

  }
};
