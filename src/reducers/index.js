import {combineReducers} from 'redux';

import todos from './todos';
import scheme from './scheme';
import hideCompleted from './hideCompleted';

export default combineReducers({
  todos,
  scheme,
  hideCompleted,
});
