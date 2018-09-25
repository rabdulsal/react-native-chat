import React, { Component } from 'react';
import { Platform } from 'react-native';
import firebase from 'firebase';
import { connect } from 'react-redux';
import shortID from '../constants/ShortID';
import { currentUser, messagesRef, imagesStore } from '../constants/Firebase';
import { loginUserSuccess, userNotAuthenticated } from '../actions/types';

class AuthService extends React.Component {
  constructor(props) {
    super(props);
    this.currentUser = null;
  }

  on = callback =>
    messagesRef()
      .limitToLast(20)
      .on('child_added', snapshot => callback(this.parse(snapshot)));

  parse = snapshot => {
    /*
      1. Deconstruct the snapshot.val(),
      calling snapshot.val() will return the value or object
      associated with the snapshot
    */
    const { timestamp: numberStamp, text, user, image } = snapshot.val();
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
      image,
    };
    return message;
  }

  off() {
    messagesRef().off();
  }

  // Create a helper for getting the user’s uid
  get uid() {
    return (currentUser() || {}).uid;
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
      const { image, text, user } = messages[i];
      // If image, upload it to firebase storage then database
      if (image) {
        const uniqueID = shortID.generate();
        const imgName = `${currentUser().uid}_${uniqueID}`;
        this.uploadImage(image, imgName)
        .then(uri => {
          const message = {
            user,
            timestamp: this.timestamp,
            image: uri,
          };
          this.append(message);
        })
        .catch(error => alert(`Image upload error: ${error}`));
      } else {
        const message = {
          text,
          user,
          timestamp: this.timestamp,
        };
        this.append(message);
      }
    }
  };

  // Function will save the message object with a unique ID
  append = message => messagesRef().push(message);

  uploadImage = async (uri, imageName) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    const imageRef = imagesStore().child(imageName);
    await imageRef.put(blob);
    return imageRef.getDownloadURL();
  }
}

const mapStateToProps = state => {
  const { user } = state.auth;
  return { user };
};

AuthService.shared = new AuthService();
export default connect(mapStateToProps, { loginUserSuccess, userNotAuthenticated })(AuthService);
