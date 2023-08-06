import {
  createSlice,
  createSelector,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import { nanoid } from "nanoid";

import { statusFilters } from "../common/constants";

const todosAdapter = createEntityAdapter({
  // sortComparer: (a, b) => b.id - a.id,
});

const initialState = todosAdapter.getInitialState({
  status: "idle",
});

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    todoAdded(state, action) {
      todosAdapter.addOne(state, {
        id: nanoid(),
        text: action.payload,
        completed: false,
        color: "",
      });
    },
    todoToggled(state, action) {
      const todoId = action.payload;
      const todo = state.entities[todoId];
      todo.completed = !todo.completed;
    },
    todoRemoved: todosAdapter.removeOne,
    todoColorSelected: {
      reducer(state, action) {
        const { color, todoId } = action.payload;
        state.entities[todoId].color = color;
      },
      prepare(todoId, color) {
        return {
          payload: { todoId, color },
        };
      },
    },
    markAllCompleted(state) {
      Object.values(state.entities).forEach((todo) => {
        todo.completed = true;
      });
    },
    allDoneRemoved(state) {
      const completedIds = Object.values(state.entities)
        .filter((todo) => todo.completed)
        .map((todo) => todo.id);
      todosAdapter.removeMany(state, completedIds);
    },
  },
});

export const {
  todoAdded,
  todoToggled,
  todoRemoved,
  todoColorSelected,
  markAllCompleted,
  allDoneRemoved,
} = todosSlice.actions;

export default todosSlice.reducer;

export const { selectAll: selectTodos, selectById: selectTodoById } =
  todosAdapter.getSelectors((state) => state.todos);

export const selectTodoIds = createSelector(
  // First, pass one or more "input selector" functions:
  selectTodos,
  // Then, an "output selector" that receives all the input results as arguments
  // and returns a final result value
  (todos) => todos.map((todo) => todo.id),
);

export const selectFilteredTodos = createSelector(
  // First input selector: all todos
  selectTodos,
  // Second input selector: all filter values
  (state) => state.filters,
  // Output selector: receives both values
  (todos, filters) => {
    const { status, colors } = filters;
    const showAllCompletions = status === statusFilters.ALL;
    if (showAllCompletions && colors.length === 0) {
      return todos;
    }

    const completedStatus = status === statusFilters.COMPLETED;
    // Return either active or completed todos based on filter
    return todos.filter((todo) => {
      const statusMatches =
        showAllCompletions || todo.completed === completedStatus;
      const colorMatches = colors.length === 0 || colors.includes(todo.color);
      return statusMatches && colorMatches;
    });
  },
);

export const selectFilteredTodoIds = createSelector(
  // Pass our other memoized selector as an input
  selectFilteredTodos,
  // And derive data in the output selector
  (filteredTodos) => filteredTodos.map((todo) => todo.id),
);
