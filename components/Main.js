import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView
 } from 'react-native';
 import SignUpForm from './SignUpForm';
 import SignInForm from './SignInForm';

console.disableYellowBox = true;

export default class Main extends Component {
  static navigationOptions = {
    title: 'Sign-Up/In',
  }

  onChangeText = name => this.setState({ name });

  onSuccessfulAuthentication = (user) => {
    this.props.navigation.navigate('Chat', { name: user.username });
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <SignInForm
          onSuccessfulAuthentication={this.onSuccessfulAuthentication}
        />
        <SignUpForm
          onSuccessfulAuthentication={this.onSuccessfulAuthentication}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    marginBottom: 20
  },
});
