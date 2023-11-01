import config from 'app/tamagui.config'
import { TamaguiProvider, TamaguiProviderProps } from '@my/ui'

export function Provider({ children, ...rest }: Omit<TamaguiProviderProps, 'config'>) {
  return (
    <TamaguiProvider config={config} disableInjectCSS {...rest}>
      {children}
    </TamaguiProvider>
  )
}
