import { useColorScheme } from 'react-native'

import config from 'app/tamagui.config'
import { StoreProvider } from 'app/zustand'
import { TamaguiProvider, TamaguiProviderProps } from '@my/ui'

export function Provider({ children, ...rest }: Omit<TamaguiProviderProps, 'config'>) {
  const scheme = useColorScheme()

  return (
    <StoreProvider>
      <TamaguiProvider
        config={config}
        disableInjectCSS
        defaultTheme={scheme === 'dark' ? 'dark' : 'light'}
        {...rest}
      >
        {children}
      </TamaguiProvider>
    </StoreProvider>
  )
}
