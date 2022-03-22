import React from "react";
import { NativeBaseProvider } from "native-base";
import TodoApp from "./components/TodoApp";

const Main = () => {
  return (
    <NativeBaseProvider>
      <TodoApp />
    </NativeBaseProvider>
  );
};

export default Main;
