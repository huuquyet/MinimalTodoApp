import React from "react";
import { useSelector } from "react-redux";
import { Box, Center, ScrollView, Spinner, VStack } from "native-base";

import SingleTodo from "./SingleTodo";
import { selectFilteredTodoIds } from "../features/todosSlice";

const VisibleTodoList = () => {
  const todoIds = useSelector(selectFilteredTodoIds);
  const loadingStatus = useSelector((state) => state.todos.status);

  if (loadingStatus === "loading") {
    return (
      <Center>
        <Spinner />
      </Center>
    );
  }

  return (
    <Box shadow={2}>
      {todoIds.length > 0 ? (
        <ScrollView h="450">
          <VStack>
            {todoIds.map((todoId) => (
              <SingleTodo key={todoId} id={todoId} />
            ))}
          </VStack>
        </ScrollView>
      ) : (
        <Center p={2}>Nothing here 🙈🐘</Center>
      )}
    </Box>
  );
};

export default VisibleTodoList;
