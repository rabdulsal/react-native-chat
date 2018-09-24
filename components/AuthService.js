import React, { Component } from 'react';
import { Platform } from 'react-native';
import firebase from 'firebase';
import { connect } from 'react-redux';
// import RNFetchBlob from 'react-native-fetch-blob';
import firebaseConfig from '../private/FirebaseConfig';
import { AUTH_REF, IMAGES_STORE } from '../constants/Firebase';
import { loginUserSuccess, userNotAuthenticated } from '../actions/types';

class AuthService extends React.Component {
  constructor(props) {
    super(props);
    this.init();
    // this.observeAuth();
    this.currentUser = null;
    // this.Blob = RNFetchBlob.polyfill.blob;
    // console.log('Run this.Blob');
    // this.fs = RNFetchBlob.fs;
    // console.log('Run this.fs');
    // window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
    // console.log('Run window.XMLHttpRequest');
    // window.Blob = this.Blob;
    // console.log('Run window.Blob');
  }

  init = () => {

    // firebase.initializeApp(firebaseConfig);
  }

  observeAuth = () => {
    // firebase.auth().onAuthStateChanged(this.onAuthStateChanged);
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
    const { timestamp: numberStamp, text, user, image } = snapshot.val();
    if (image) { console.log(`Snapshot image: ${image}`); }
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
    if (message.image) { console.log(`Snapshot message image: ${message.image}`); }
    return message;
  }

  off() {
    this.messagesRef.off();
  }

  // Create a helper for getting the user’s uid
  get uid() {
    return (AUTH_REF.currentUser || {}).uid;
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
        this.uploadImage(image)
        .then(uri => {
          console.log(`Upload URI: ${uri}`);
          const message = {
            user,
            timestamp: this.timestamp,
            image: uri,
          };
          if (image) { console.log(`Upload message image: ${message.image}`); }
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
  append = message => this.messagesRef.push(message);

  // onLaunchCameraPress = async () => {
  //   let result = await ImagePicker.launchCameraAsync();
  //
  //   if (!result.cancelled) {
  //     this.uploadImage(result.uri, 'test-image')
  //     .then(() => {
  //       // Store image-link to message
  //
  //       // Reset images
  //       this.setImages([]);
  //     })
  //     .catch(error => alert(`Upload image error: ${error}`));
  //   }
  // }

  uploadImage = async (uri, imageName) => {
    const response = await fetch(uri);
    const blob = await response.blob();

    const imageRef = IMAGES_STORE.child('imageName');
    await imageRef.put(blob);
    return imageRef.getDownloadURL();
  }

  // uploadImage = (uri, mime = 'application/octet-stream') => {
  //   return new Promise((resolve, reject) => {
  //     const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
  //     let uploadBlob = null;
  //
  //     const imageRef = IMAGES_STORE.child('image_001');
  //
  //     this.fs.readFile(uploadUri, 'base64')
  //       .then((data) => {
  //         return this.Blob.build(data, { type: `${mime};BASE64` });
  //       })
  //       .then((blob) => {
  //         uploadBlob = blob;
  //         return imageRef.put(blob, { contentType: mime });
  //       })
  //       .then(() => {
  //         uploadBlob.close();
  //         return imageRef.getDownloadURL();
  //       })
  //       .then((url) => {
  //         resolve(url);
  //       })
  //       .catch((error) => {
  //         reject(error);
  //     });
  //   });
  // }
}

const mapStateToProps = state => {
  const { user } = state.auth;
  return { user };
};

AuthService.shared = new AuthService();
export default connect(mapStateToProps, { loginUserSuccess, userNotAuthenticated })(AuthService);
// export default AuthService;
