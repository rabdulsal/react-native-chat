/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
} from 'react-native';
import { connect } from 'react-redux';
import { List, ListItem } from 'react-native-elements';
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

    this.props.fetchContacts(username);
  }

  onContactPress = (contact) => {
    this.props.navigation.navigate('chat', { name: contact.username });
  }

  render() {
    return (
      <View style={styles.container}>
        <List>
          <FlatList
            data={this.props.contacts}
            renderItem={({ item }) => (
              <ListItem
                title={`${item.username}`}
                subtitle={item.email}
                onPress={() => this.onContactPress(item)}
              />
            )}
            keyExtractor={item => item.uid}
          />
        </List>
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
