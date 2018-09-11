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

  state = {
    name: ''
  };

  onChangeText = name => this.setState({ name });

  onSuccessfulAuthentication = (user) => {
    this.props.navigation.navigate('Chat', { name: user.username });
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        { /* 1. Render Sign In Form */ }
        <SignInForm
          onSuccessfulAuthentication={this.onSuccessfulAuthentication}
        />
        { /* 2. Render Sign Un Form */ }
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
