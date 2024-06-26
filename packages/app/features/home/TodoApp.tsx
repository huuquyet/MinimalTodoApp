import { Button, H3, XStack, YStack } from '@my/ui'
import { Menu, Monitor, Moon, Sun } from '@tamagui/lucide-icons'
import { useThemeStore, useTodoStore } from 'app/zustand'
import { FilterTodo } from './FilterTodo'
import { InputTodo } from './InputTodo'
import { VisibleTodoList } from './VisibleTodoList'

export const TodoApp = () => {
  return (
    <YStack f={1} bc="$backgroundStrong" gap="$4">
      <AppBar />
      <InputTodo />
      <FilterTodo />
      <VisibleTodoList />
    </YStack>
  )
}

const icons = {
  dark: <Moon />,
  light: <Sun />,
  system: <Monitor />,
}

const AppBar = () => {
  const { incompletedCount } = useTodoStore()
  const { scheme, toggleScheme } = useThemeStore()

  const todosRemaining = `${incompletedCount > 0 ? ` (${incompletedCount})` : ''}`

  return (
    <XStack
      pos="absolute"
      t={0}
      ai="center"
      jc="center"
      elevation="$5"
      h="$5"
      w="100%"
      px="$4"
      bc="$background"
      zi={1}
      gap="$4"
    >
      <Button icon={Menu} size="$4" onPress={() => null} circular chromeless />
      <H3 fg={1}>📝️ To Do List {todosRemaining}</H3>
      <Button icon={icons[scheme]} size="$4" onPress={toggleScheme} circular chromeless />
    </XStack>
  )
}
