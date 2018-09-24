/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
} from 'react-native';
import { connect } from 'react-redux';
import { fetchContacts } from '../actions';

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

    this.props.fetchContacts();
  }

  render() {
    return (
      <View style={styles.container}>
      <FlatList
        data={this.props.contacts}
        renderItem={({ item }) => <Text style={styles.item}>{item.username}</Text>}
        keyExtractor={item => item.uid}
      />
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
  const { contacts } = state.contacts;
  return { user, contacts };
};

export default connect(mapStateToProps, { fetchContacts })(ContactsScreen);
