import { TamaguiProvider, type TamaguiProviderProps, config } from '@my/ui'
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native'
import { type mode, useThemeStore } from 'app/zustand'
import { Appearance } from 'react-native'

export function Provider({ children, ...rest }: Omit<TamaguiProviderProps, 'config'>) {
  const { scheme } = useThemeStore()

  const current = () => {
    if (scheme === ('system' as mode)) {
      return Appearance.getColorScheme() as mode
    }
    return scheme
  }

  return (
    <ThemeProvider value={current() === 'dark' ? DarkTheme : DefaultTheme}>
      <TamaguiProvider defaultTheme={current()} config={config} disableInjectCSS {...rest}>
        {children}
      </TamaguiProvider>
    </ThemeProvider>
  )
}
