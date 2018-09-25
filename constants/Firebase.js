import * as firebase from 'firebase';
import firebaseConfig from '../private/FirebaseConfig';

firebase.initializeApp(firebaseConfig);

export const authRef = () => { return firebase.auth(); };
export const currentUser = () => { return authRef().currentUser; };
export const databaseRef = () => { return firebase.database().ref(); };
export const storageRef = () => { return firebase.storage().ref(); };
export const usersRef = () => { return databaseRef().child('users'); };
export const messagesRef = () => { return databaseRef().child('messages'); };
export const imagesRef = () => { return databaseRef().child('images'); };
export const imagesStore = () => { return storageRef().child('image'); };
// TODO: Will eventually be 'images' following testing
