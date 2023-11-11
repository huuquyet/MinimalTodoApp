import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native'
import { Provider } from 'app/provider'
import { useThemeStore } from 'app/zustand'
import { useFonts } from 'expo-font'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'

export default function HomeLayout() {
  const [loaded] = useFonts({
    InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
    InterMedium: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
  })
  const { scheme } = useThemeStore()

  if (!loaded) {
    return null
  }
  return (
    <ThemeProvider value={scheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Provider>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        />
        <StatusBar style="auto" hidden />
      </Provider>
    </ThemeProvider>
  )
}
