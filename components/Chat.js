import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import AuthService from './AuthService';

// console.disableYellowBox = true;

type Props = {
  name?: string,
}

export default class Chat extends Component {

  static navigationOptions = ({ navigation }) => ({
    title: (navigation.state.params || {}).name || 'Chat!'
  });

  state = {
    messages: [],
  };

  /*
    1. When the component is added to the screen, start looking for messages.
    Call the AuthService.shared.on method and pass in a callback.
    We want our callback to get messages then add them to our current messages.
  */
  componentDidMount() {
      AuthService.shared.on(message =>
        this.setState(previousState => ({
          messages: GiftedChat.append(previousState.messages, message),
        }))
      );
  }
  // 2. When the component leaves the screen, unsubscribe from the database.
  componentWillUnmount() {
    AuthService.shared.off();
  }

  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={AuthService.shared.send}
        user={this.user}
      />
    );
  }

  get user() {
    /*
      Next we need a simple reference to our user
      so GiftedChat knows which side of the screen to put our chat bubbles on.
      Return our name and our UID for GiftedChat to parse
    */

    return {
      name: this.props.navigation.state.params.name,
      _id: AuthService.shared.uid,
    };
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
