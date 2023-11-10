import { TamaguiProvider, TamaguiProviderProps } from '@my/ui'
import config from 'app/tamagui.config'
import { useThemeStore } from 'app/zustand'

export function Provider({ children, ...rest }: Omit<TamaguiProviderProps, 'config'>) {
  const { theme } = useThemeStore()

  return (
    <TamaguiProvider defaultTheme={theme} config={config} disableInjectCSS {...rest}>
      {children}
    </TamaguiProvider>
  )
}
