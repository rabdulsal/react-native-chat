import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView
 } from 'react-native';
 import { connect } from 'react-redux';
 import SignUpForm from './SignUpForm';
 import SignInForm from './SignInForm';
 import { checkAuthentication, userNotAuthenticated } from '../actions';
 import { Spinner } from './common';

console.disableYellowBox = true;

class Main extends Component {
  static navigationOptions = {
    title: 'Sign-Up/In',
  }

  componentWillMount() {
    this.props.checkAuthentication();
  }

  componentDidMount() {
    if (this.props.user) {
      this.onSuccessfulAuthentication(this.props.user);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { user } = nextProps;
    if (user) {
      this.onSuccessfulAuthentication(user);
    }
  }

  onSuccessfulAuthentication = (user) => {
    this.props.navigation.navigate('Chat', { name: user.username });
  }

  render() {
    if (this.props.isLoading) {
      console.log('Loading...');
      return (
        <Spinner size='large' />
      );
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

export default connect(mapStateToProps, { checkAuthentication, userNotAuthenticated })(Main);
