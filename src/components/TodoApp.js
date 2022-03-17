import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Center,
  extendTheme,
  HStack,
  Icon,
  NativeBaseProvider,
  Pressable,
  Switch,
  Text,
  VStack,
} from "native-base";
import { StatusBar } from "expo-status-bar";
import { FontAwesome5 } from "@expo/vector-icons";

import InputTodo from "./InputTodo";
import VisibleTodoList from "./VisibleTodoList";
import FilterTodo from "./FilterTodo";
import { selectTodos } from "../features/todosSlice";
import { modesChanged } from "../features/modesSlice";
import { modes } from "../common/constants";

const TodoApp = () => {
  const scheme = useSelector((state) => state.modes.scheme);

  const dispatch = useDispatch();

  const onModesChanged = () => dispatch(modesChanged());

  // Define the config
  const config = {
    useSystemColorMode: false,
    initialColorMode: scheme,
  };

  // extend the theme
  const customTheme = extendTheme({ config });

  const todosRemaining = useSelector((state) => {
    const uncompletedTodos = selectTodos(state).filter(
      (todo) => !todo.completed
    );
    return `${
      uncompletedTodos.length > 0 ? ` (${uncompletedTodos.length})` : ""
    }`;
  });

  const AppBar = () => {
    return (
      <>
        <StatusBar bg="#3700B3" barStyle="light-content" />
        <Box safeAreaTop bg="#6200ee" />
        <HStack
          bg="#6200ee"
          px="1"
          py="3"
          justifyContent="space-between"
          alignItems="center"
          w="100%"
          maxW="500"
          shadow={2}
        >
          <Text color="white" fontSize="20" fontWeight="bold">
            📝️ To Do List {todosRemaining}
          </Text>
          <Pressable onPress={onModesChanged}>
            <HStack>
              <Icon as={FontAwesome5} name="sun" size="sm" color="white" />
              <Switch value={scheme === modes.DARK} />
              <Icon as={FontAwesome5} name="sun" size="sm" color="white" />
            </HStack>
          </Pressable>
        </HStack>
      </>
    );
  };

  return (
    <NativeBaseProvider>
      <Center>
        <AppBar />
        <VStack space={2} w="100%" maxW="500">
          <InputTodo />
          <VisibleTodoList />
          <FilterTodo />
        </VStack>
      </Center>
    </NativeBaseProvider>
  );
};

export default TodoApp;
