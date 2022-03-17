import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Box,
  Button,
  Center,
  HStack,
  Icon,
  Input,
  Spinner,
  Tooltip,
} from "native-base";
import { FontAwesome5 } from "@expo/vector-icons";

import { todoAdded } from "../features/todosSlice";

const InputTodo = () => {
  const [text, setText] = useState("");
  const [status, setStatus] = useState("idle");
  const dispatch = useDispatch();

  const handleKeyDown = (e) => {
    // If the user pressed the Enter key:
    if (e.which === 13) {
      handleButton();
    }
  };

  const handleButton = () => {
    const trimmedText = text.trim();
    if (trimmedText) {
      // Create and dispatch the thunk function itself
      setStatus("loading");
      dispatch(todoAdded(trimmedText));
      // And clear out the text input
      setText("");
      setStatus("idle");
    }
  };

  let isLoading = status === "loading";
  let placeholder = isLoading ? "" : "What needs to be done?";

  return (
    <Box p={1} mt={2} shadow={2}>
      <HStack space={1} justifyContent="space-between">
        <Input
          variant="underlined"
          disabled={isLoading}
          value={text}
          placeholder={placeholder}
          size="md"
          autoFocus
          p={2}
          h={10}
          w="90%"
          onChangeText={(text) => setText(text)}
        />
        <Tooltip label="Add New Todo">
          <Button
            variant="outline"
            size="sm"
            onPress={handleButton}
            leftIcon={<Icon as={FontAwesome5} name="plus-circle" size="sm" />}
          >
            ADD
          </Button>
        </Tooltip>
      </HStack>

      {isLoading ? (
        <Center display="flex" justifyContent="center">
          <Spinner />
        </Center>
      ) : null}
    </Box>
  );
};

export default InputTodo;
