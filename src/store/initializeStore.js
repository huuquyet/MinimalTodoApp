import React from "react";
import { configureStore } from "@reduxjs/toolkit";

import { loadFromLocalStorage, saveToLocalStorage } from "./localStorage";
import todosReducer from "../features/todosSlice";
import filtersReducer from "../features/filtersSlice";

const preloadedState = loadFromLocalStorage();

const store = configureStore({
  reducer: {
    // Define a top-level state field named `todos`, handled by `todosReducer`
    todos: todosReducer,
    filters: filtersReducer,
  },
  preloadedState,
});

const _ = require("lodash");

store.subscribe(
  _.throttle(function () {
    saveToLocalStorage(store.getState());
  }, 1000)
);

export default store;
