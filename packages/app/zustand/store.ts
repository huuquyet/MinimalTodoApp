import { createContext, useContext } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { v4 as uuid } from 'uuid'
import { createStore } from 'zustand'
import { useStoreWithEqualityFn } from 'zustand/traditional'
import { devtools, persist, createJSONStorage } from 'zustand/middleware'
import { shallow } from 'zustand/shallow'

import { availableColors, statusFilters, statusLoading } from 'app/common/constants'

interface Todo {
  id: string
  text: string
  completed: boolean
  color: string
}

interface StoreProps {
  todos: Todo[]
  text: string
  status: (typeof statusFilters)['ALL' | 'ACTIVE' | 'COMPLETED']
  colors: Array<(typeof availableColors)[number]>
  loading: (typeof statusLoading)['IDLE' | 'LOADING' | 'FAILED']
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
  status: statusFilters.ALL,
  colors: [],
  loading: statusLoading.IDLE,
}

export type StoreType = ReturnType<typeof initializeStore>

const zustandContext = createContext<StoreType | null>(null)

export const Provider = zustandContext.Provider

export const useStore = <T>(selector: (state: StoreInterface) => T) => {
  const store = useContext(zustandContext)

  if (!store) throw new Error('Store is missing the provider')

  return useStoreWithEqualityFn(store, selector, shallow)
}

export const getStorageType = () => {
  const isBrowser = typeof window === 'undefined' //browser or react-native
  return isBrowser ? window.localStorage : AsyncStorage
}

export const initializeStore = (preloadedState: Partial<StoreProps> = {}) => {
  return createStore<StoreInterface>()(
    devtools(
      persist(
        (set, get) => ({
          ...getDefaultInitialState,
          ...preloadedState,
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
                  id: uuid(),
                  text,
                  completed: false,
                  color: '',
                },
              ],
            })
          },
          todoToggled: (id: string) => {
            set({
              todos: get().todos.map((todo) => {
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
              todos: get().todos.filter((todo) => todo.id !== id),
            })
          },
          todoColorSelected: (id: string, color: string) => {
            set({
              todos: get().todos.map((todo) => {
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
              todos: get().todos.map((todo) => ({
                ...todo,
                completed: true,
              })),
            })
          },
          clearAllCompleted: () => {
            set({
              todos: get().todos.filter((todo) => !todo.completed),
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
}

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
    selectTodoById: (id: string) => store.todos.find((todo) => todo.id === id),
    incompletedCount: store.todos.filter((todo) => !todo.completed).length,
    selectFilteredIds: () => {
      const statusShowAll = store.status === statusFilters.ALL
      const statusCompleted = store.status === statusFilters.COMPLETED
      // return all todos with no filters
      if (statusShowAll && store.colors.length === 0) {
        return store.todos.map((todo) => todo.id)
      }

      // return either active or completed todos based on filters
      return store.todos
        .filter((todo) => {
          const statusMatches = statusShowAll || todo.completed === statusCompleted
          const colorMatches = store.colors.length === 0 || store.colors.includes(todo.color)
          return statusMatches && colorMatches
        })
        .map((todo) => todo.id)
    },
  }))
}
