import firebase from 'firebase';
import firebaseConfig from '../private/FirebaseConfig';

class AuthService {
  constructor() {
    this.init();
    this.observeAuth();
  }

  init = () => {
    firebase.initializeApp(firebaseConfig);
  }

  observeAuth = () => {
    firebase.auth().onAuthStateChanged(this.onAuthStateChanged);
  }

  onAuthStateChanged = (user) => {
    if (user) {
      // Do something with user variable like mayber store inspect
      // this.successfullyAuthenticatedUser();
    }
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

  createNewUser = (username, email, password) => {
    return new Promise((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(() => {
          this.updateUserInfo({ email, username })
          .then(user => resolve(user))
          .catch(error => reject(error));
        })
        .catch(error => reject(error));
    });
  }

  updateUserInfo = ({ email, username }) => {
    return new Promise((resolve, reject) => {
      firebase.database().ref(`/users/${this.uid}`)
      .set({ email, username })
      .then(user => resolve(user))
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

AuthService.shared = new AuthService();
export default AuthService;
