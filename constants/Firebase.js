import * as firebase from 'firebase';
import firebaseConfig from '../private/FirebaseConfig';

firebase.initializeApp(firebaseConfig);

export const AUTH_REF = firebase.auth();
export const DATABASE_REF = firebase.database().ref();
export const STORAGE_REF = firebase.storage().ref();
export const USERS_REF = DATABASE_REF.child('users');
export const MESSAGES_REF = DATABASE_REF.child('messages');
export const IMAGES_REF = DATABASE_REF.child('images');
export const IMAGES_STORE = STORAGE_REF.child('image');
