import React from "react";
import { useSelector } from "react-redux";
import {
  Box,
  Center,
  HStack,
  Icon,
  Pressable,
  StatusBar,
  Switch,
  Text,
  useColorMode,
  useColorModeValue,
  VStack,
} from "native-base";
import { FontAwesome5 } from "@expo/vector-icons";

import InputTodo from "./InputTodo";
import VisibleTodoList from "./VisibleTodoList";
import FilterTodo from "./FilterTodo";
import { selectTodos } from "../features/todosSlice";

const TodoApp = () => {
  const { colorMode, toggleColorMode } = useColorMode();

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
        <Box safeAreaTop bg="#0bd" />
        <HStack
          bg="#0bd"
          px="1"
          py="3"
          justifyContent="space-between"
          alignItems="center"
          w="100%"
          maxW="500"
          shadow={2}
          position="fixed"
          top={0}
          zIndex={1}
        >
          <Text color="white" fontSize="20" fontWeight="bold">
            📝️ To Do List {todosRemaining}
          </Text>
          <Pressable onPress={toggleColorMode}>
            <HStack>
              <Icon as={FontAwesome5} name="sun" size="sm" color="white" />
              <Switch value={colorMode === "light"} />
              <Icon as={FontAwesome5} name="moon" size="sm" color="white" />
            </HStack>
          </Pressable>
        </HStack>
      </>
    );
  };

  return (
    <Center bg={useColorModeValue("warmGray.50", "coolGray.800")}>
      <AppBar />
      <VStack space={2} w="100%" maxW="500">
        <InputTodo />
        <VisibleTodoList />
        <FilterTodo />
      </VStack>
    </Center>
  );
};

export default TodoApp;
