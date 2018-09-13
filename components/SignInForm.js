import React, { Component } from 'react';
import {
  View,
  Text,
} from 'react-native';
import { connect } from 'react-redux';
import { Input, Button, Spinner } from './common';
import { signinEmailChanged, signinPasswordChanged, loginUser } from '../actions';

class SignInForm extends Component {
  componentWillReceiveProps(nextProps) {
    const { user } = nextProps;

    if (user) {
      this.props.onSuccessfulAuthentication(user);
    }
  }

  handleChangeEmail = signinEmail => this.props.signinEmailChanged(signinEmail);
  handleChangePassword = signinPassword => this.props.signinPasswordChanged(signinPassword);

  handlePressedSignInButton = () => {
    const { signinEmail, signinPassword } = this.props;
    this.props.loginUser({ signinEmail, signinPassword });
  }

  renderSignInButton = () => {
    if (this.props.signinIsLoading) {
      return (
        <Button disabled>
          <Spinner size="large" />
        </Button>
      );
    }
    return (
      <Button
        onPress={this.handlePressedSignInButton}
      >
        Login!
      </Button>
    );
  }

  render() {
    if (this.props.signinError) {
      alert(this.props.signinError);
    }

    return (
      <View style={styles.container}>
        <Text style={styles.signInText}>Sign In!</Text>
        <View style={styles.signInForm}>
          <Input
            placeholder="Email"
            value={this.props.signinEmail}
            onChangeText={this.handleChangeEmail}
          />
          <Input
            secureTextEntry
            placeholder="Password"
            value={this.props.signinPassword}
            onChangeText={this.handleChangePassword
            }
          />
        </View>
        {this.renderSignInButton()};
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
    fontSize: 24,
    marginLeft: 24,
    marginTop: 20
  },
  signInForm: {
    height: 140,
    justifyContent: 'space-around'
  }
};

const mapStateToProps = state => {
  const {
    signinEmail,
    signinPassword,
    signinError,
    signinIsLoading,
    user
  } = state.auth;

  return {
    signinEmail,
    signinPassword,
    signinError,
    signinIsLoading,
    user
  };
};

export default connect(mapStateToProps, {
  signinEmailChanged,
  signinPasswordChanged,
  loginUser
})(SignInForm);
