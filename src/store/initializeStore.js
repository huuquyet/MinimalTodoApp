import {createStore} from 'redux';
import throttle from 'lodash/throttle';

import {loadFromLocalStorage, saveToLocalStorage} from './localStorage';
import rootReducer from '../reducers/index';
import {themeModes} from '../common/constants';

const initialState = loadFromLocalStorage() || {
  todos: [],
  themeMode: themeModes.DARK,
  hideCompleted: false,
};

const store = createStore(rootReducer, initialState);

store.subscribe(
  throttle(() => {
    saveToLocalStorage(store.getState());
  }, 1000),
);

export default store;
