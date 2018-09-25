import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
} from 'react-native';
import { connect } from 'react-redux';
import { signout } from '../actions';
import { Button } from '../components/common';

class AccountScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    if (params) {
      return {
        title: params.username || 'User!',
        headerLeft: null, // NOTE: Must clear stack for Android
        style: {
          marginTop: Platform.OS === 'android' ? 24 : 0
        }
      };
    }
  };

  componentWillMount = () => {
    const { username } = this.props.user;
    this.props.navigation.setParams({ username });
  }

  onSignoutPress = () => {
    this.props.signout();
    this.props.navigation.navigate('auth');
  }

  render() {
    const { username } = this.props.user ? this.props.user : 'User';
    return (
      <View style={styles.container}>
        <Text>Hello {username}</Text>
        <Button
          onPress={this.onSignoutPress}
          style={styles.buttonStyle}
        >
          Sign Out
        </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonStyle: {
    flex: 1,
    alignSelf: 'center',
    marginTop: 10
  }
});

const mapStateToProps = state => {
  const { user } = state.auth;
  return { user };
};

export default connect(mapStateToProps, { signout })(AccountScreen);
