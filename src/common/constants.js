const actionTypes = {
  ADD_TODO: 'ADD TODO',
  REMOVE_TODO: 'REMOVE TODO',
  COMPLETE_TODO: 'COMPLETE TODO',
  TOGGLE_SCHEME: 'TOGGLE SCHEME',
  TOGGLE_COMPLETED: 'TOGGLE COMPLETED',
};

Object.freeze(actionTypes);

export {actionTypes};

const themeModes = {
  DARK: 'dark',
  LIGHT: 'light',
};

Object.freeze(themeModes);

export {themeModes};

const filterTitles = {
  HIDE_COMPLETED: 'HIDE COMPLETED',
  SHOW_ALL: 'SHOW ALL',
};

Object.freeze(filterTitles);

export {filterTitles};
