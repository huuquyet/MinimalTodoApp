import { Stack } from 'expo-router'

import { TodoApp } from 'app/features/home'

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
