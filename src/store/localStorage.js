import React from "react";

export function saveToLocalStorage(state) {
  try {
    if (window.localStorage && state) {
      localStorage.setItem("MinimalTodoApp", JSON.stringify(state));
    }
  } catch (e) {
    console.log(e);
  }
}

export function loadFromLocalStorage() {
  try {
    if (window.localStorage) {
      let jsonTodos = localStorage.getItem("MinimalTodoApp");
      if (jsonTodos) {
        let state = JSON.parse(jsonTodos);
        if (state === null) return undefined;
        return state;
      }
    }
  } catch (e) {
    console.log(e);
  }
}
