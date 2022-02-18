/**
 * @format
 */

import {AppRegistry} from 'react-native';

import App from './src/App';
import {name as appName} from './app.json';

if (module.hot) {
  module.hot.accept();
}

AppRegistry.registerComponent(appName, () => App);
