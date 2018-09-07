import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import Validator from 'validator';
import { Input, Button } from './common';
import AuthService from './AuthService';

export default class SignInForm extends Component {
  state = {
    email: '',
    password: ''
  };


  onSuccessfulAuthentication = () => {
    this.props.onSuccessfulAuthentication();
  }

  handleChangeEmail = email => this.setState({ email })
  handleChangePassword = password => this.setState({ password });

  handlePressedSignInButton = () => {
    const { email, password } = this.state;
    if (Validator.isEmail(email) && password.trim()) {
      AuthService.shared.loginUser(email, password, this.onSuccessfulAuthentication);
    } else {
      alert('There was an error validating your Email, Username or Password');
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.signInText}>Sign In!</Text>
        <View style={styles.signInForm}>
          <Input
            placeholder="Email"
            value={this.state.email}
            onChangeText={this.handleChangeEmail}
          />
          <Input
            secureTextEntry
            placeholder="Password"
            value={this.state.password}
            onChangeText={this.handleChangePassword}
          />
        </View>
        <Button
          onPress={this.handlePressedSignInButton}
        >
          Login!
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
  signInText: {
    alignSelf: 'flex-start', // Left
    marginLeft: 24,
    marginTop: 20
  },
  signInForm: {
    height: 225,
    justifyContent: 'space-around'
  }
};
