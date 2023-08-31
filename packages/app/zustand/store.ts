import { createContext, useContext } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { v4 as uuid } from 'uuid'
import { createStore } from 'zustand'
import { useStoreWithEqualityFn } from 'zustand/traditional'
import { devtools, persist, createJSONStorage } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import { shallow } from 'zustand/shallow'

import { availableColors, statusFilters, statusLoading } from 'app/common/constants'

interface Todo {
  id: string
  text: string
  completed: boolean
  color: string
}

interface StoreInterface {
  todos: Todo[]
  text: string
  status: (typeof statusFilters)['ALL' | 'ACTIVE' | 'COMPLETED']
  colors: Array<(typeof availableColors)[number]>
  loading: (typeof statusLoading)['IDLE' | 'LOADING' | 'FAILED']
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

const getDefaultInitialState = () => ({
  todos: [],
  text: '',
  status: statusFilters.ALL,
  colors: [],
  loading: statusLoading.IDLE,
})

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

export const initializeStore = (preloadedState: Partial<StoreInterface> = {}) => {
  return createStore<StoreInterface>()(
    immer(
      devtools(
        persist(
          (set, get) => ({
            ...getDefaultInitialState(),
            ...preloadedState,
            setText: (text: string) => {
              set({ text })
            },
            setLoading: (loading: string) => {
              set({ loading })
            },
            todoAdded: (text: string) => {
              get().todos.push({
                id: uuid(),
                text: text,
                completed: false,
                color: '',
              })
            },
            todoToggled: (id: string) => {
              const todo = get().todos.find((todo) => todo.id === id)!
              todo.completed = !todo.completed
            },
            todoDeleted: (id: string) => {
              set({
                todos: get().todos.filter((todo) => todo.id !== id),
              })
            },
            todoColorSelected: (id: string, color: string) => {
              const todo = get().todos.find((todo) => todo.id === id)!
              todo.color = color
            },
            markAllCompleted: () => {
              get().todos.forEach((todo) => {
                todo.completed = true
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
    selectTodoIds: store.todos.map((todo) => todo.id),
    incompletedTodos: store.todos.filter((todo) => !todo.completed),
  }))
}
