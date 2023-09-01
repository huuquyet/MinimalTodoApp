const statusFilters = {
  ALL: 'all',
  ACTIVE: 'active',
  COMPLETED: 'completed',
}
Object.freeze(statusFilters)
export { statusFilters }

const statusLoading = {
  IDLE: 'idle',
  LOADING: 'loading',
  FAILED: 'failed',
}
Object.freeze(statusLoading)
export { statusLoading }

export const availableColors = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet']

export const capitalize = (s) => s[0].toUpperCase() + s.slice(1)
