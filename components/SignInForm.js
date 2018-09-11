import React, { Component } from 'react';
import {
  View,
  Text,
} from 'react-native';
import { connect } from 'react-redux';
import { Input, Button, Spinner } from './common';
import { emailChanged, passwordChanged, loginUser } from '../actions';

class SignInForm extends Component {
  componentWillReceiveProps(nextProps) {
    const { user } = nextProps;
    if (user) {
      this.props.onSuccessfulAuthentication(user);
    }
  }

  componentWillUnmount() {

  }

  handleChangeEmail = email => this.props.emailChanged(email);
  handleChangePassword = password => this.props.passwordChanged(password);

  handlePressedSignInButton = () => {
    const { email, password } = this.props;
    this.props.loginUser({ email, password });
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
            value={this.props.email}
            onChangeText={this.handleChangeEmail}
          />
          <Input
            secureTextEntry
            placeholder="Password"
            value={this.props.password}
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
  const { email, password, error, loading, user } = state.auth;
  return {
    email,
    password,
    error,
    loading,
    user
  };
};

export default connect(mapStateToProps, {
  emailChanged,
  passwordChanged,
  loginUser
})(SignInForm);
