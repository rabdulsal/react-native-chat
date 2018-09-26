import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView
 } from 'react-native';
 import { connect } from 'react-redux';
 import SignUpForm from '../components/SignUpForm';
 import SignInForm from '../components/SignInForm';
 import { checkAuthentication } from '../actions';
 import { Spinner } from '../components/common';

console.disableYellowBox = true;

class AuthScreen extends Component {
  static navigationOptions = {
    title: 'Sign-Up/In',
  }

  componentWillMount() {
    this.props.checkAuthentication();
  }

  componentWillReceiveProps(nextProps) {
    const { user } = nextProps;
    if (user) {
      this.onSuccessfulAuthentication(user);
    }
  }

  onSuccessfulAuthentication = (user) => {
    this.props.navigation.navigate('main', { name: user.username });
  }

  render() {
    if (this.props.isLoading) {
      return <Spinner size='large' />;
    }

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

const mapStateToProps = state => {
  const { user, isLoading } = state.main;
  return { user, isLoading };
};

export default connect(mapStateToProps, { checkAuthentication })(AuthScreen);
