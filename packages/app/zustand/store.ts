import AsyncStorage from '@react-native-async-storage/async-storage'
import * as Crypto from 'expo-crypto'
import { create } from 'zustand'
import { devtools, persist, createJSONStorage } from 'zustand/middleware'

export const statusFilters = ['ALL', 'ACTIVE', 'COMPLETED'] as const
export const statusLoading = ['IDLE', 'LOADING', 'FAILED'] as const
export const availableColors = [
  'red',
  'orange',
  'yellow',
  'green',
  'cyan',
  'blue',
  'violet',
] as const

interface Todo {
  id: string
  text: string
  completed: boolean
  color: string
}

interface StoreProps {
  todos: Todo[]
  text: string
  status: (typeof statusFilters)[number]
  colors: Array<(typeof availableColors)[number]>
  loading: (typeof statusLoading)[number]
}

interface StoreInterface extends StoreProps {
  setText: (text: string) => void
  setLoading: (loading: string) => void
  todoAdded: (text: string) => void
  todoToggled: (id: string) => void
  todoDeleted: (id: string) => void
  todoColorSelected: (id: string, color: string) => void
  markAllCompleted: () => void
  clearAllCompleted: () => void
  statusFilterChanged: (status: string) => void
  colorFilterChanged: (colors: string[]) => void
}

const getDefaultInitialState: StoreProps = {
  todos: [],
  text: '',
  status: 'ALL' as const,
  colors: [],
  loading: 'IDLE' as const,
}

const getStorageType = () => {
  const isBrowser = typeof window === 'undefined' //browser or react-native
  return isBrowser ? window.localStorage : AsyncStorage
}

export const useStore = create<StoreInterface>()(
  devtools(
    persist(
      (set, get) => ({
        ...getDefaultInitialState,
        setText: (text: string) => {
          set({ text })
        },
        setLoading: (loading: string) => {
          set({ loading })
        },
        todoAdded: (text: string) => {
          set({
            todos: [
              ...get().todos,
              {
                id: Crypto.randomUUID(),
                text,
                completed: false,
                color: '',
              },
            ],
          })
        },
        todoToggled: (id: string) => {
          set({
            todos: get().todos.map<Todo>((todo: Todo) => {
              if (todo.id !== id) {
                return todo
              }
              return {
                ...todo,
                completed: !todo.completed,
              }
            }),
          })
        },
        todoDeleted: (id: string) => {
          set({
            todos: get().todos.filter((todo: Todo) => todo.id !== id),
          })
        },
        todoColorSelected: (id: string, color: string) => {
          set({
            todos: get().todos.map<Todo>((todo: Todo) => {
              if (todo.id !== id) {
                return todo
              }
              return {
                ...todo,
                color,
              }
            }),
          })
        },
        markAllCompleted: () => {
          set({
            todos: get().todos.map<Todo>((todo: Todo) => ({
              ...todo,
              completed: true,
            })),
          })
        },
        clearAllCompleted: () => {
          set({
            todos: get().todos.filter((todo: Todo) => !todo.completed),
          })
        },
        statusFilterChanged: (status: string) => {
          set({ status })
        },
        colorFilterChanged: (colors: string[]) => {
          set({ colors })
        },
      }),
      { name: '@minimal_todo', storage: createJSONStorage(() => getStorageType()) }
    ),
    { enabled: false }
  )
)

export const useTodo = () => {
  return useStore((store) => ({
    todos: store.todos,
    text: store.text,
    status: store.status,
    colors: store.colors,
    loading: store.loading,
    setText: store.setText,
    setLoading: store.setLoading,
    todoAdded: store.todoAdded,
    todoToggled: store.todoToggled,
    todoDeleted: store.todoDeleted,
    todoColorSelected: store.todoColorSelected,
    markAllCompleted: store.markAllCompleted,
    clearAllCompleted: store.clearAllCompleted,
    statusFilterChanged: store.statusFilterChanged,
    colorFilterChanged: store.colorFilterChanged,
    selectTodoById: (id: string) => store.todos.find((todo: Todo) => todo.id === id),
    incompletedCount: store.todos.filter((todo: Todo) => !todo.completed).length,
    selectFilteredIds: () => {
      const statusShowAll = store.status === 'ALL'
      const statusCompleted = store.status === 'COMPLETED'
      // return all todos with no filters
      if (statusShowAll && store.colors.length === 0) {
        return store.todos.map<string>((todo: Todo) => todo.id)
      }

      // return either active or completed todos based on filters
      return store.todos
        .filter((todo: Todo) => {
          const statusMatches = statusShowAll || todo.completed === statusCompleted
          const colorMatches = store.colors.length === 0 || store.colors.includes(todo.color)
          return statusMatches && colorMatches
        })
        .map<string>((todo: Todo) => todo.id)
    },
  }))
}
