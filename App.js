import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import { Icon } from 'react-native-elements';
import reducers from './reducers';
import AuthScreen from './screens/AuthScreen';
import AccountScreen from './screens/AccountScreen';
import ContactsScreen from './screens/ContactsScreen';
import Chat from './components/Chat';

export default class App extends Component {
  render() {
    const MainNavigator = createBottomTabNavigator({
      auth: { screen: AuthScreen },
      main: {
        screen: createBottomTabNavigator({
          contacts: {
            screen: createStackNavigator({
              contacts: { screen: ContactsScreen },
              chat: { screen: Chat }
            }),
            navigationOptions: () => ({
              tabBarIcon: ({ tintColor }) => {
                return (
                <Icon
                  name='group'
                  size={30}
                  color={tintColor}
                />
                );
              }
            })
          },
          account: {
            screen: createStackNavigator({
              account: { screen: AccountScreen },

            }),
            navigationOptions: () => ({
              tabBarIcon: ({ tintColor }) => {
                return (
                  <Icon
                    name='account-box'
                    size={30}
                    color={tintColor}
                  />
                );
              },
            })
          },
        }),
        navigationOptions: () => ({
          title: 'Welcome',
          headerLeft: null
        })
     }
   }, {
    navigationOptions: {
      tabBarVisible: false
    },
    lazyLoad: true
  });

    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

    return (
      <Provider store={store}>
        <MainNavigator />
      </Provider>
    );
  }
}
