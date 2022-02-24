import {actionTypes} from '../common/constants';

export function addTodo(todo) {
  return {
    type: actionTypes.ADD_TODO,
    todo,
  };
}

export function removeTodo(todoId) {
  return {
    type: actionTypes.REMOVE_TODO,
    todoId,
  };
}

export function completeTodo(todoId) {
  return {
    type: actionTypes.COMPLETE_TODO,
    todoId,
  };
}

export function toggleScheme(scheme) {
  return {
    type: actionTypes.TOGGLE_SCHEME,
    scheme,
  };
}

export function toggleCompleted(hideCompleted) {
  return {
    type: actionTypes.TOGGLE_COMPLETED,
    hideCompleted,
  };
}
