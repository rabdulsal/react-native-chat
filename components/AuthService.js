import React, { Component } from 'react';
import firebase from 'firebase';
import { connect } from 'react-redux';
import firebaseConfig from '../private/FirebaseConfig';
import { loginUserSuccess, userNotAuthenticated } from '../actions/types';

class AuthService extends React.Component {
  constructor(props) {
    super(props);
    this.init();
    console.log('Init new AuthService');
    // this.observeAuth();
    this.currentUser = null;
  }

  init = () => {
    firebase.initializeApp(firebaseConfig);
  }

  observeAuth = () => {
    // firebase.auth().onAuthStateChanged(this.onAuthStateChanged);
  }

  onAuthStateChanged = (user) => {
    // Inspect user data
    // user.providerData.forEach(profile => {
    //   console.log(`Sign-in provider: ${profile.providerId}`);
    //   console.log(`Provider-specific UID: ${profile.uid}`);
    //   console.log(`Name: ${profile.displayName}`);
    //   console.log(`Email: ${profile.email}`);
    //   console.log(`Photo URL: ${profile.photoURL}`);
    // });
    // return new Promise((resolve, reject) => {
      if (user) {
        // Do something with user variable like mayber store inspect
        // this.successfullyAuthenticatedUser();
        this.props.loginUserSuccess(user);
        console.log('Login Success Run');
          // this.fetchUserInfo()
          // .then(usr => {
          //   this.currentUser = usr;
          //   console.log(`AuthState Current User: ${this.currentUser}`);
          //   this.props.loginUserSuccess(usr).bind(this);
          //   // return (dispatch) => {
          //   //   dispatch({
          //   //     type: SIGNIN_USER_SUCCESS,
          //   //     payload: usr,
          //   //   });
          //   // };
          // })
          // .catch(error => console.log(`Auth state user fetch error: ${error}`));
      } else {
        this.props.userNotAuthenticated().bind(this);
        // return (dispatch) => {
        //   dispatch({
        //     type: USER_NOT_AUTHENTICATED,
        //   });
        // };
      }
    //   resolve(null);
    // });
  }

  checkAuthenticationGetUser = () => {
    // return new Promise((resolve, reject) => {
    //   firebase.auth().onAuthStateChanged(this.onAuthStateChanged)
    //   .then(user => resolve(user))
    //   .catch(error => reject(error));
    // });
    return new Promise((resolve, reject) => {
      if (this.currentUser) {
        console.log('Firebase Current User');
        resolve(this.currentUser);
        // Do something with user variable like mayber store inspect
        // this.successfullyAuthenticatedUser();
          // this.fetchUserInfo()
          // .then(usr => {
          //   this.currentUser = usr;
          //   console.log(`Current User: ${this.currentUser}`);
          //   console.log(`User: ${usr}`);
          //   resolve(usr);
          // })
          // .catch(error => reject(`Auth state user fetch error: ${error}`));
      }
      reject();
    });
  }

  loginUser = (email, password) => {
    return new Promise((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(email, password)
        .then(() => {
          this.fetchUserInfo()
          .then(user => resolve(user))
          .catch(error => reject(error));
        })
        .catch((error) => reject(error));
    });
  }

  createNewUser = (email, username, password) => {
    return new Promise((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(() => this.updateUserInfo({ email, username })
          .then(user => resolve(user))
          .catch(error => reject(error)))
        .catch(error => reject(error));
    });
  }

  signout = () => {
    firebase.auth().signOut()
    .then()
    .catch(error => console.log(`Signout Error: ${error}`));
  }

  updateUserInfo = ({ email, username }) => {
    return new Promise((resolve, reject) => {
      firebase.database().ref(`/users/${this.uid}`)
      .set({ email, username })
      .then(() => this.fetchUserInfo()
        .then(user => resolve(user))
        .catch(error => reject(error)))
      .catch(error => reject(error));
    });
  }

  fetchUserInfo = () => {
    return new Promise((resolve, reject) => {
      firebase.database().ref(`/users/${this.uid}`)
      .on('value', snapshot => {
        const user = snapshot.val();
        resolve(user);
        // TODO: Where to reject?
      });
    });
  }

  get messagesRef() {
    return firebase.database().ref('messages');
  }

  on = callback =>
    this.messagesRef
      .limitToLast(20)
      .on('child_added', snapshot => callback(this.parse(snapshot)));

  parse = snapshot => {
    /*
      1. Deconstruct the snapshot.val(),
      calling snapshot.val() will return the value or object
      associated with the snapshot
    */
    const { timestamp: numberStamp, text, user } = snapshot.val();
    const { key: _id } = snapshot;
    // 2. Let’s convert the timestamp that was saved, to a js Date.
    const timestamp = new Date(numberStamp);
    /* 3.
      create an object that GiftedChat is familiar with,
      then return it, _id is the unique key for the message,
      text, user, and timestamp
    */
    const message = {
      _id,
      timestamp,
      text,
      user,
    };
    return message;
  }

  off() {
    this.messagesRef.off();
  }

  // Create a helper for getting the user’s uid
  get uid() {
    return (firebase.auth().currentUser || {}).uid;
  }
  // 2. Get the accurate timestamp for saving messages
  get timestamp() {
    return firebase.database.ServerValue.TIMESTAMP;
  }

  /*
    Function that accepts an array of messages,
    then loop through the messages
  */
  send = messages => {
    for (let i = 0; i < messages.length; i++) {
      const { text, user } = messages[i];
      // 4.
      const message = {
        text,
        user,
        timestamp: this.timestamp,
      };
      this.append(message);
    }
  };

  // Function will save the message object with a unique ID
  append = message => this.messagesRef.push(message);
}

const mapStateToProps = state => {
  const { user } = state.auth;
  return { user };
};

AuthService.shared = new AuthService();
export default connect(mapStateToProps, { loginUserSuccess, userNotAuthenticated })(AuthService);
// export default AuthService;
