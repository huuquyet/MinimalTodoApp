import { Provider } from 'app/provider'
import { useFonts } from 'expo-font'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'

export default function HomeLayout() {
  const [loaded] = useFonts({
    InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
    InterMedium: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
  })

  if (!loaded) {
    return null
  }

  return (
    <Provider>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
      <StatusBar style="auto" hidden />
    </Provider>
  )
}
