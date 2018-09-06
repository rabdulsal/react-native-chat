import firebase from 'firebase';
import firebaseConfig from '../private/FirebaseConfig';

class Fire {
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

  onAuthStateChanged = user => {
    console.log(`Auth User: ${user}`);
    if (!user) {
      try {
        firebase.auth().signInAnonymously();
      } catch ({ message }) {
        alert(`Authentication Error: ${message}`);
      }
    }
  }

  get ref() {
    return firebase.database().ref('messages');
  }

  on = callback =>
    this.ref
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
    this.ref.off();
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
      console.log(`Message ${message}`);
      this.append(message);
    }
  };

  // Function will save the message object with a unique ID
  append = message => this.ref.push(message);
}

Fire.shared = new Fire();
export default Fire;
