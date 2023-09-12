import config from 'app/tamagui.config'
import { StoreProvider } from 'app/zustand'
import { TamaguiProvider, TamaguiProviderProps } from '@my/ui'

export function Provider({ children, ...rest }: Omit<TamaguiProviderProps, 'config'>) {
  return (
    <StoreProvider>
      <TamaguiProvider config={config} disableInjectCSS {...rest}>
        {children}
      </TamaguiProvider>
    </StoreProvider>
  )
}
