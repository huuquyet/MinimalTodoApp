const modes = {
  DARK: "dark",
  LIGHT: "light",
};
Object.freeze(modes);
export { modes };

const statusFilters = {
  ALL: "all",
  ACTIVE: "active",
  COMPLETED: "completed",
};
Object.freeze(statusFilters);
export { statusFilters };

export const availableColors = ["red", "orange", "green", "navy", "purple"];

export const capitalize = (s) => s[0].toUpperCase() + s.slice(1);
