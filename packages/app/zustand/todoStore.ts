import AsyncStorage from '@react-native-async-storage/async-storage'
import * as Crypto from 'expo-crypto'
import { isWindowDefined } from '@tamagui/constants'
import { create } from 'zustand'
import { devtools, persist, createJSONStorage } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

const statusLoading = ['IDLE', 'LOADING', 'FAILED'] as const
export const statusFilters = ['ALL', 'ACTIVE', 'COMPLETED'] as const
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
  color: (typeof availableColors)[number]
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
  setLoading: (loading: (typeof statusLoading)[number]) => void
  todoAdded: (text: string) => void
  todoToggled: (id: string) => void
  todoDeleted: (id: string) => void
  todoColorSelected: (id: string, color: (typeof availableColors)[number]) => void
  markAllCompleted: () => void
  clearAllCompleted: () => void
  statusFilterChanged: (status: (typeof statusFilters)[number]) => void
  colorFilterChanged: (colors: Array<(typeof availableColors)[number]>) => void
}

const getDefaultInitialState: StoreProps = {
  todos: [],
  text: '',
  status: 'ALL' as const,
  colors: [],
  loading: 'IDLE' as const,
}

const createTodoStore = create<StoreInterface>()(
  devtools(
    persist(
      immer((set) => ({
        ...getDefaultInitialState,
        setText: (text: string) => {
          set({ text })
        },
        setLoading: (loading: (typeof statusLoading)[number]) => {
          set({ loading })
        },
        todoAdded: (text: string) => {
          set((state) => {
            state.todos.push({
              id: Crypto.randomUUID(),
              text,
              completed: false,
              color: '',
            })
          })
        },
        todoToggled: (id: string) => {
          set((state) => {
            const todo = state.todos.find((todo: Todo) => todo.id === id)!
            todo.completed = !todo.completed
          })
        },
        todoDeleted: (id: string) => {
          set((state) => {
            state.todos = state.todos.filter((todo: Todo) => todo.id !== id)
          })
        },
        todoColorSelected: (id: string, color: (typeof availableColors)[number]) => {
          set((state) => {
            const todo = state.todos.find((todo: Todo) => todo.id === id)!
            todo.color = color
          })
        },
        markAllCompleted: () => {
          set((state) => {
            state.todos.forEach((todo: Todo) => {
              todo.completed = true
            })
          })
        },
        clearAllCompleted: () => {
          set((state) => {
            state.todos = state.todos.filter((todo: Todo) => !todo.completed)
          })
        },
        statusFilterChanged: (status: (typeof statusFilters)[number]) => {
          set({ status })
        },
        colorFilterChanged: (colors: Array<(typeof availableColors)[number]>) => {
          set({ colors })
        },
      })),
      {
        name: '@minimal_todo',
        storage: createJSONStorage(() => (isWindowDefined ? window.localStorage : AsyncStorage)),
      }
    ),
    { enabled: false }
  )
)

export const useTodoStore = () => {
  return createTodoStore((store) => ({
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
