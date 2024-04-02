import { TamaguiProvider, type TamaguiProviderProps } from '@my/ui'
import { NextThemeProvider, useRootTheme, useThemeSetting } from '@tamagui/next-theme'
import config from 'app/tamagui.config'
import { createThemeStore, createTodoStore, type mode, useThemeStore } from 'app/zustand'
import { useEffect } from 'react'

export function Provider({ children, ...rest }: Omit<TamaguiProviderProps, 'config'>) {
  const [theme, setTheme] = useRootTheme()
  const themeSetting = useThemeSetting()!
  const { scheme } = useThemeStore()

  const current = () => {
    if (scheme === ('system' as mode)) {
      return themeSetting.systemTheme as mode
    }
    return scheme
  }

  useEffect(() => {
    createThemeStore.persist.rehydrate()
    createTodoStore.persist.rehydrate()
  }, [])

  return (
    <NextThemeProvider
      onChangeTheme={(next) => {
        setTheme(next as any)
      }}
    >
      <TamaguiProvider defaultTheme={current()} config={config} disableInjectCSS {...rest}>
        {children}
      </TamaguiProvider>
    </NextThemeProvider>
  )
}
