import {AppRegistry} from 'react-native';

import appInfo from '../app.json';
import App from '../src/themes/App';

if (module.hot) {
  module.hot.accept();
}

AppRegistry.registerComponent(appInfo.name, () => App);
AppRegistry.runApplication(appInfo.name, {
  initialProps: {},
  rootTag: document.getElementById('app-root'),
});
