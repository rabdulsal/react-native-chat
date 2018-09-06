import { createStackNavigator } from 'react-navigation';
import Main from './components/Main';
import Chat from './components/Chat';

const navigator = createStackNavigator({
  Main: { screen: Main },
  Chat: { screen: Chat },
});
// Export it as the root component
export default navigator;
