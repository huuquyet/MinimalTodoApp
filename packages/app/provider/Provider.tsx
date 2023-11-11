import { TamaguiProvider, TamaguiProviderProps } from '@my/ui'
import config from 'app/tamagui.config'
import { useThemeStore } from 'app/zustand'

export function Provider({ children, ...rest }: Omit<TamaguiProviderProps, 'config'>) {
  const { scheme } = useThemeStore()

  return (
    <TamaguiProvider defaultTheme={scheme} config={config} disableInjectCSS {...rest}>
      {children}
    </TamaguiProvider>
  )
}
