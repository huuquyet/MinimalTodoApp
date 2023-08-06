import { NativeBaseProvider } from "native-base";
import TodoApp from "./components/TodoApp";

export default function Main() {
  return (
    <NativeBaseProvider>
      <TodoApp />
    </NativeBaseProvider>
  );
}
