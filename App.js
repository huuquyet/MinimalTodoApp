import React from "react";
import { Provider } from "react-redux";

import store from "./src/store/initializeStore";
import TodoApp from "./src/components/TodoApp";

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
