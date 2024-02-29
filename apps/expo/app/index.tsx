import { TodoApp } from 'app/features/home'
import { Stack } from 'expo-router'

export default function Screen() {
  return (
    <>
      <Stack.Screen
        options={{
          title: 'Home',
        }}
      />
      <TodoApp />
    </>
  )
}
