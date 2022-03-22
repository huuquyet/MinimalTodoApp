import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Checkbox,
  HStack,
  IconButton,
  Pressable,
  Select,
  Text,
  Tooltip,
} from "native-base";
import { FontAwesome5 } from "@expo/vector-icons";

import {
  todoColorSelected,
  todoRemoved,
  todoToggled,
  selectTodoById,
} from "../features/todosSlice";
import { availableColors, capitalize } from "../common/constants";

const SingleTodo = ({ id }) => {
  // Call our `selectTodoById` with the state _and_ the ID value
  const todo = useSelector((state) => selectTodoById(state, id));
  const { text, completed, color } = todo;

  const dispatch = useDispatch();

  const handleCompletedChanged = () => {
    dispatch(todoToggled(todo.id));
  };

  const handleColorChanged = (color) => {
    dispatch(todoColorSelected(todo.id, color));
  };

  const onDelete = () => {
    dispatch(todoRemoved(todo.id));
  };

  return (
    <HStack p={1} space={1}>
      <Checkbox
        isChecked={completed}
        onToggle={handleCompletedChanged}
        accessibilityLabel="Completed"
        value={text}
      />
      <Pressable flexGrow={1} onPress={handleCompletedChanged}>
        <Text style={{ textDecoration: completed ? "line-through" : "none" }}>
          {text}
        </Text>
      </Pressable>
      <Select
        variant="underlined"
        onValueChange={(color) => handleColorChanged(color)}
        selectedValue={color}
        accessibilityLabel="Color"
        placeholder="Color"
      >
        {availableColors.map((color) => (
          <Select.Item key={color} label={capitalize(color)} value={color} />
        ))}
      </Select>
      <Tooltip label="Remove">
        <IconButton
          onPress={onDelete}
          _icon={{
            as: FontAwesome5,
            name: "trash",
            size: "xs",
          }}
        />
      </Tooltip>
    </HStack>
  );
};

export default SingleTodo;
