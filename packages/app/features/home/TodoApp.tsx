import { InputTodo } from './InputTodo'
import { VisibleTodoList } from './VisibleTodoList'
import { FilterTodo } from './FilterTodo'
import { useTodoStore, useThemeStore } from 'app/zustand'
import { Button, H3, XStack, YStack } from '@my/ui'
import { Menu, Moon, Sun } from '@tamagui/lucide-icons'

export const TodoApp = () => {
  return (
    <YStack f={1} h="100%" bc="$backgroundStrong" space>
      <AppBar />
      <InputTodo />
      <FilterTodo />
      <VisibleTodoList />
    </YStack>
  )
}

const icons = {
  dark: Moon,
  light: Sun,
}

const AppBar = () => {
  const { incompletedCount } = useTodoStore()
  const { theme, toggleTheme } = useThemeStore()

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
      p="$4"
      bc="$background"
      zIndex={1}
      space
    >
      <Button icon={Menu} size="$4" onPress={() => null} circular chromeless />
      <H3 fg={1}>📝️ To Do List {todosRemaining}</H3>
      <Button icon={icons[theme]} size="$4" onPress={toggleTheme} circular chromeless />
    </XStack>
  )
}
