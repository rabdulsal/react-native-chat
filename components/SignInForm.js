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

  componentWillUnmount() {

  }

  handleChangeEmail = signinEmail => this.props.signinEmailChanged(signinEmail);
  handleChangePassword = signinPassword => this.props.signinPasswordChanged(signinPassword);

  handlePressedSignInButton = () => {
    const { signinEmail, signinPassword } = this.props;
    console.log(`Email: ${signinEmail} Password: ${signinPassword}`);
    this.props.loginUser({ signinEmail, signinPassword });
  }

  render() {
    if (this.props.loading) {
      return <Spinner size="large" />;
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
    fontSize: 24,
    marginLeft: 24,
    marginTop: 20
  },
  signInForm: {
    height: 225,
    justifyContent: 'space-around'
  }
};

const mapStateToProps = state => {
  const { signinEmail, signinPassword, error, loading, user } = state.auth;
  return {
    signinEmail,
    signinPassword,
    error,
    loading,
    user
  };
};

export default connect(mapStateToProps, {
  signinEmailChanged,
  signinPasswordChanged,
  loginUser
})(SignInForm);
