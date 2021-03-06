import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
} from 'react-native';
import { Button } from 'react-native-elements';
import { GiftedChat } from 'react-native-gifted-chat';
import { connect } from 'react-redux';
import AuthService from './AuthService'; // Update to use redux ChatActions
import { signout } from '../actions';
import CustomActions from './CustomActions';

// console.disableYellowBox = true;

type Props = {
  name?: string,
}

class Chat extends Component {

  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;


    return {
      title: (params || {}).name || 'Chat!',
      headerRight: (
        <Button
          title="Logout"
          onPress={() => params.signout && params.signout()}
          backgroundColor='rgba(0,0,0,0)'
          color='rgba(0, 122, 255, 1)'
        />
      ),
      style: {
        marginTop: Platform.OS === 'android' ? 24 : 0
      }
    };
  };

  state = {
    messages: [],
  };

  /*
    1. When the component is added to the screen, start looking for messages.
    Call the AuthService.shared.on method and pass in a callback.
    We want our callback to get messages then add them to our current messages.
  */
  componentDidMount() {
      AuthService.shared.on(messages =>
        this.updateMessagesState(messages)
      );
      this.props.navigation.setParams({ signout: () => this.onSignoutPress() });
  }
  // 2. When the component leaves the screen, unsubscribe from the database.
  componentWillUnmount() {
    AuthService.shared.off();
  }

  onSignoutPress = () => {
    this.props.signout();
    this.props.navigation.navigate('main');
  }

  updateMessagesState = (messages = []) => {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));
  }

  get user() {
    /*
      Next we need a simple reference to our user
      so GiftedChat knows which side of the screen to put our chat bubbles on.
      Return our name and our UID for GiftedChat to parse
    */
    return {
      name: this.props.navigation.state.params.name,
      _id: AuthService.shared.uid,
    };
  }

  renderCustomActions = (props) => {
    return (
      <CustomActions {...props} />
    );
  }

  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={AuthService.shared.send}
        user={this.user}
        renderActions={this.renderCustomActions}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const mapStateToProps = state => {
  const { user } = state.auth;
  return user;
};

export default connect(mapStateToProps, { signout })(Chat);
