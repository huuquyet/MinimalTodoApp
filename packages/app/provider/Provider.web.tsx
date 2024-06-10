import { TamaguiProvider, type TamaguiProviderProps, config } from '@my/ui'
import { NextThemeProvider, useRootTheme, useThemeSetting } from '@tamagui/next-theme'
import { type mode, useThemeStore } from 'app/zustand'

export function Provider({ children, ...rest }: Omit<TamaguiProviderProps, 'config'>) {
  const [_, setTheme] = useRootTheme()
  const themeSetting = useThemeSetting()!
  const { scheme } = useThemeStore()

  const current = () => {
    if (scheme === ('system' as mode)) {
      return themeSetting.systemTheme as mode
    }
    return scheme
  }

  return (
    <NextThemeProvider onChangeTheme={setTheme as any}>
      <TamaguiProvider defaultTheme={current()} config={config} disableInjectCSS {...rest}>
        {children}
      </TamaguiProvider>
    </NextThemeProvider>
  )
}
