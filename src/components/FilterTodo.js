import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Box,
  Button,
  Checkbox,
  HStack,
  Icon,
  Tooltip,
  useColorModeValue,
  VStack,
} from "native-base";
import { FontAwesome5 } from "@expo/vector-icons";

import {
  colorFilterChanged,
  statusFilterChanged,
} from "../features/filtersSlice";
import { markAllCompleted, allDoneRemoved } from "../features/todosSlice";
import {
  availableColors,
  capitalize,
  statusFilters,
} from "../common/constants";

const StatusFilter = ({ value: status, onChange }) => {
  const renderedFilters = Object.keys(statusFilters).map((key) => {
    const value = statusFilters[key];
    const handleClick = () => onChange(value);
    const selected = value === status ? "secondary" : "primary";

    return (
      <Button
        key={value}
        onPress={handleClick}
        color={selected}
        leftIcon={<Icon as={FontAwesome5} name="filter" size="xs" />}
        sx={{ mx: 1 }}
      >
        {key}
      </Button>
    );
  });

  return (
    <HStack space={1} justifyContent="center">
      {renderedFilters}
    </HStack>
  );
};

const ColorFilters = ({ value: colors, onChange }) => {
  const renderedColors = availableColors.map((color) => {
    const checked = colors.includes(color);
    const handleChange = () => {
      const changeType = checked ? "removed" : "added";
      onChange(color, changeType);
    };

    return (
      <Checkbox
        key={color}
        name={color}
        checked={checked}
        onChange={handleChange}
        sx={{ color }}
        value={checked}
      >
        {capitalize(color)}
      </Checkbox>
    );
  });

  return (
    <HStack space={1} justifyContent="center">
      {renderedColors}
    </HStack>
  );
};

const FilterTodo = () => {
  const dispatch = useDispatch();

  const { status, colors } = useSelector((state) => state.filters);

  const onMarkCompletedClicked = () => dispatch(markAllCompleted());

  const onClearCompletedClicked = () => dispatch(allDoneRemoved());

  const onColorChange = (color, changeType) =>
    dispatch(colorFilterChanged(color, changeType));

  const onStatusChange = (status) => dispatch(statusFilterChanged(status));

  return (
    <Box
      shadow={2}
      position="fixed"
      bottom={0}
      maxW="500"
      w="100%"
      zIndex={1}
      bg={useColorModeValue("warmGray.50", "coolGray.800")}
    >
      <VStack space={2}>
        <HStack justifyContent="space-between" m={1}>
          <Tooltip label="Mark All Completed">
            <Button
              onPress={onMarkCompletedClicked}
              leftIcon={
                <Icon as={FontAwesome5} name="check-double" size="xs" />
              }
            >
              Mark All Completed
            </Button>
          </Tooltip>
          <Tooltip label="Clear Completed">
            <Button
              onPress={onClearCompletedClicked}
              leftIcon={<Icon as={FontAwesome5} name="trash-alt" size="xs" />}
            >
              CLEAR COMPLETED
            </Button>
          </Tooltip>
        </HStack>

        <StatusFilter value={status} onChange={onStatusChange} />
        <ColorFilters value={colors} onChange={onColorChange} />
      </VStack>
    </Box>
  );
};

export default FilterTodo;
