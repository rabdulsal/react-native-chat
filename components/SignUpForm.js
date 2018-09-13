/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
} from 'react-native';
import { connect } from 'react-redux';
import { Input, Button, Spinner } from './common';
import {
  signupEmailChanged,
  signupUsernameChanged,
  signupPasswordChanged,
  createUser
} from '../actions';

class SignUpForm extends Component {
  componentWillReceiveProps(nextProps) {
    const { user } = nextProps;
    if (user) {
      this.props.onSuccessfulAuthentication(user);
    }
  }

  onSuccessfulAuthentication = (user) => {
    this.props.onSuccessfulAuthentication(user);
  }

  handleChangeEmail = signupEmail => this.props.signupEmailChanged(signupEmail);
  handleChangeUsername = signupUsername => this.props.signupUsernameChanged(signupUsername);
  handleChangePassword = signupPassword => this.props.signupPasswordChanged(signupPassword);

  handlePressedSignUpButton = () => {
    const { signupUsername, signupEmail, signupPassword } = this.props;
    this.props.createUser({ signupEmail, signupUsername, signupPassword });
  }

  renderSignUpButton = () => {
    if (this.props.signupIsLoading) {
      return (
        <Button disabled>
          <Spinner size="large" />
        </Button>
      );
    }
    return (
      <Button
        onPress={this.handlePressedSignUpButton}
      >
        Create Account!
      </Button>
    );
  }

  render() {
    if (this.props.signupError) {
      alert(this.props.signupError);
    }

    return (
      <View style={styles.container}>
      <Text style={styles.signUpText}>Sign Up!</Text>
        <View style={styles.signUpForm}>
          <Input
            placeholder="Email"
            value={this.props.signupEmail}
            onChangeText={this.handleChangeEmail}
          />
          <Input
            placeholder="Username"
            value={this.props.signupUsername}
            onChangeText={this.handleChangeUsername}
          />
          <Input
            secureTextEntry
            placeholder="Password"
            value={this.props.signupPassword}
            onChangeText={this.handleChangePassword}
          />
        </View>
          {this.renderSignUpButton()}
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
    fontSize: 24,
    marginLeft: 24,
    marginTop: 20
  },
  signUpForm: {
    height: 200,
    justifyContent: 'space-around'
  }
};

const mapStateToProps = state => {
  const {
    signupEmail,
    signupPassword,
    signupError,
    signupIsLoading,
    user,
    signupUsername
  } = state.auth;
  
  return {
    signupEmail,
    signupPassword,
    signupError,
    signupIsLoading,
    user,
    signupUsername
  };
};

export default connect(mapStateToProps, {
  signupEmailChanged,
  signupPasswordChanged,
  signupUsernameChanged,
  createUser
})(SignUpForm);
