import { NativeBaseProvider } from "native-base";
import { TodoApp } from "./components/TodoApp";

export function Main() {
  return (
    <NativeBaseProvider>
      <TodoApp />
    </NativeBaseProvider>
  );
}
