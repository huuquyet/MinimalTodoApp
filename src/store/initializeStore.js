import React from "react";
import { configureStore } from "@reduxjs/toolkit";
import throttle from "lodash/throttle";

import { loadFromLocalStorage, saveToLocalStorage } from "./localStorage";
import todosReducer from "../features/todosSlice";
import filtersReducer from "../features/filtersSlice";
import modesReducer from "../features/modesSlice";

const preloadedState = loadFromLocalStorage();

const store = configureStore({
  reducer: {
    // Define a top-level state field named `todos`, handled by `todosReducer`
    todos: todosReducer,
    filters: filtersReducer,
    modes: modesReducer,
  },
  preloadedState,
});

store.subscribe(
  throttle(() => {
    saveToLocalStorage(store.getState());
  }, 1000)
);

export default store;
