import React from "react";
import { Provider } from "react-redux";

import store from "./src/store/initializeStore";
import Main from "./src/Main";

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Main />
      </Provider>
    );
  }
}

export default App;
