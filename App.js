import { Provider } from "react-redux";

import store from "./src/store/initializeStore";
import Main from "./src/Main";

export default function App() {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
}
