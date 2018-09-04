/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';

export default class Chat extends Component {

  static navigationOptions = ({ navigation }) => ({
    title: (navigation.state.params || {}).name || 'Chat!'
  });

  state = {
    messages: [],
  };

  render() {
    return (
      <GiftedChat messages={this.state.messgaes} />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
