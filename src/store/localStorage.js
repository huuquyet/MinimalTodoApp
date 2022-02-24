import MinimalApp from '../lib/MinimalApp';

export function saveToLocalStorage(minimalApp) {
  try {
    if (window.localStorage && minimalApp) {
      let jsonTodos = Object.assign(new MinimalApp(), minimalApp).serialize();
      window.localStorage.setItem('MinimalApp', JSON.stringify(jsonTodos));
    }
  } catch (e) {
    console.log(e);
  }
}

export function loadFromLocalStorage() {
  try {
    if (window.localStorage) {
      let jsonTodos = window.localStorage.getItem('MinimalApp');
      if (jsonTodos) {
        let minimalApp = JSON.parse(jsonTodos);
        if (minimalApp === null) {
          return undefined;
        }
        return MinimalApp.deserialize(minimalApp);
      }
    }
  } catch (e) {
    console.log(e);
  }
}
