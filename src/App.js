import React from "react";
import { Provider } from "react-redux";

import store from "./store/initializeStore";
import TodoApp from "./components/TodoApp";

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <TodoApp />
      </Provider>
    );
  }
}

export default App;
