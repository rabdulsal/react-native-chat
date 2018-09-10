import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStackNavigator } from 'react-navigation';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import reducers from './reducers';
import Main from './components/Main';
import Chat from './components/Chat';

export default class App extends Component {
  render() {
    const MainNavigator = createStackNavigator({
      Main: { screen: Main },
      Chat: { screen: Chat },
    });

    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

    return (
      <Provider store={store}>
        <MainNavigator />
      </Provider>
    );
  }
}
