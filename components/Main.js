import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity
 } from 'react-native';

export default class Main extends Component {

  state = {
    name: ''
  };

  onChangeText = name => this.setState({ name });

  onPress = () => {
    this.props.navigation.navigate('Chat', { name: this.state.name });
  }

  render() {
    return (
      <View>
        <TextInput
          style={styles.nameInput}
          placeHolder="Rashad Salaam"
          value={this.state.name}
          onChangeText={this.onChangeText}
        />

        <TouchableOpacity
          onPress={this.onPress}
        >
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const offset = 24;
const styles = StyleSheet.create({
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
