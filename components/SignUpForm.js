/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import Validator from 'validator';
import axios from 'axios';
import firebase from 'firebase';
import { Input, Button } from './common';
import AuthService from './AuthService';

export default class SignUpForm extends Component {
  state = {
    email: '',
    username: '',
    password: ''
  };

  onSuccessfulAuthentication = (user) => {
    this.props.onSuccessfulAuthentication(user);
  }

  handleChangeEmail = email => this.setState({ email })
  handleChangeUsername = username => this.setState({ username });
  handleChangePassword = password => this.setState({ password });

  handlePressedSignUpButton = () => {
    const { username, email, password } = this.state;
    if (Validator.isEmail(email) && username.trim() && password.trim()) {
      AuthService.shared.createNewUser(
        username,
        email,
        password,
        this.onSuccessfulAuthentication
      );
    } else {
      alert('There was an error validating your Email, Username or Password');
    }
  }

  render() {
    return (
      <View style={styles.container}>
      <Text style={styles.signUpText}>Sign Up!</Text>
        <View style={styles.signUpForm}>
          <Input
            placeholder="Email"
            value={this.state.email}
            onChangeText={this.handleChangeEmail}
          />
          <Input
            placeholder="Username"
            value={this.state.username}
            onChangeText={this.handleChangeUsername}
          />
          <Input
            secureTextEntry
            placeholder="Password"
            value={this.state.password}
            onChangeText={this.handleChangePassword}
          />
        </View>
        <Button onPress={this.handlePressedSignUpButton}>
          Create Account!
        </Button>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    alignItems: 'center'
  },
  signUpText: {
    alignSelf: 'flex-start', // Left
    marginLeft: 24,
    marginTop: 20
  },
  signUpForm: {
    height: 225,
    justifyContent: 'space-around'
  }
};
