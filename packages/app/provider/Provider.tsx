import { TamaguiProvider, TamaguiProviderProps } from '@my/ui'
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native'
import config from 'app/tamagui.config'
import { createThemeStore, createTodoStore, type mode, useThemeStore } from 'app/zustand'
import { useEffect } from 'react'
import { Appearance } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export function Provider({ children, ...rest }: Omit<TamaguiProviderProps, 'config'>) {
  const { top, left, right } = useSafeAreaInsets()
  const { scheme } = useThemeStore()

  const current = () => {
    if (scheme === ('system' as mode)) {
      return Appearance.getColorScheme() as mode
    }
    return scheme
  }

  useEffect(() => {
    createThemeStore.persist.rehydrate()
    createTodoStore.persist.rehydrate()
  }, [])

  return (
    <ThemeProvider
      value={current() === 'dark' ? DarkTheme : DefaultTheme}
      t={top}
      l={left}
      r={right}
    >
      <TamaguiProvider defaultTheme={current()} config={config} disableInjectCSS {...rest}>
        {children}
      </TamaguiProvider>
    </ThemeProvider>
  )
}
