import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity
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
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        // 1. Render Sign In Form
        <SignInForm
          onSuccessfulAuthentication={this.onSuccessfulAuthentication}
        />
        // 2. Render Sign Un Form
        <SignUpForm
          onSuccessfulAuthentication={this.onSuccessfulAuthentication}
        />
      </View>
      // <View>
      //   <Text style={styles.title}>Enter your name:</Text>
      //   <TextInput
      //     style={styles.nameInput}
      //     placeHolder="Rashad Salaam"
      //     value={this.state.name}
      //     onChangeText={this.onChangeText}
      //   />
      //
      //   <TouchableOpacity
      //     onPress={this.onPress}
      //   >
      //     <Text style={styles.buttonText}>Next</Text>
      //   </TouchableOpacity>
      // </View>
    );
  }
}

const offset = 24;
const styles = StyleSheet.create({
  title: {
    marginTop: offset,
    marginLeft: offset,
    fontSize: offset,
  },
  nameInput: {
    height: offset * 2,
    margin: offset,
    paddingHorizontal: offset,
    borderColor: '#111111',
    borderWidth: 1,
  },
  buttonText: {
    marginLeft: offset,
    fontSize: offset,
  },
});
