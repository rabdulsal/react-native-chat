/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { connect } from 'react-redux';

class ContactsScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    if (params) {
      return {
        title: `${params.username}'s Contacts`,
      };
    }
  }

  componentWillMount = () => {
    const { username } = this.props.user;
    this.props.navigation.setParams({ username });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Im the ContactsScreen component</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabIconView: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  }
});

const mapStateToProps = state => {
  const { user } = state.auth;
  return { user };
};

export default connect(mapStateToProps, {})(ContactsScreen);
