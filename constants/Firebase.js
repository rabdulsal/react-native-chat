import firebase from 'firebase';
import firebaseConfig from '../private/FirebaseConfig';

firebase.initializeApp(firebaseConfig);

export const AUTH_REF = firebase.auth();
export const DATABASE_REF = firebase.database().ref();
export const USERS_REF = DATABASE_REF.child('users');
export const MESSAGES_REF = DATABASE_REF.child('messages');
