import { create } from 'zustand'
import { createJSONStorage, devtools, persist } from 'zustand/middleware'
import { mmkvStorage } from './mmkvStorage'

export type mode = 'dark' | 'light' | 'system'

export interface ThemeInterface {
  scheme: mode
  toggleScheme: () => void
}

const getDefaultState = {
  scheme: 'dark' as mode,
}

export const createThemeStore = create<ThemeInterface>()(
  devtools(
    persist(
      (set, get) => ({
        ...getDefaultState,
        toggleScheme: () => {
          set({
            scheme:
              get().scheme === 'dark' ? 'light' : get().scheme === 'light' ? 'system' : 'dark',
          })
        },
      }),
      {
        name: 'scheme',
        storage: createJSONStorage(() => mmkvStorage),
        skipHydration: true,
      }
    ),
    { enabled: false }
  )
)

export const useThemeStore = () => {
  return createThemeStore((store) => ({
    scheme: store.scheme,
    toggleScheme: store.toggleScheme,
  }))
}
