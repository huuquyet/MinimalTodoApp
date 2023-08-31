import InputTodo from './InputTodo'
import VisibleTodoList from './VisibleTodoList'
import FilterTodo from './FilterTodo'
import { useTodo } from 'app/zustand'
import { YStack } from '@my/ui'

export function TodoApp() {
  return (
    <YStack f={1} h="100%" p="$4" space>
      {/* <AppBar /> */}
      <InputTodo />
      <VisibleTodoList />
      <FilterTodo />
    </YStack>
  )
}

const AppBar = () => {
  const { incompletedTodos } = useTodo()
  // const { colorMode, toggleColorMode } = useColorMode()

  const todosRemaining = `${incompletedTodos.length > 0 ? ` (${incompletedTodos.length})` : ''}`

  return (
    <>
      {/* <StatusBar bg="#3700B3" barStyle="light-content" />
      <Box safeAreaTop bg="#0bd" />
      <HStack
        bg="#0bd"
        px="1"
        py="3"
        justifyContent="space-between"
        alignItems="center"
        w="100%"
        maxW="500"
        shadow={2}
        position="fixed"
        top={0}
        zIndex={1}
      >
        <Text color="white" fontSize="20" fontWeight="bold">
          📝️ To Do List {todosRemaining}
        </Text>
        <Pressable onPress={toggleColorMode}>
          <HStack>
            <Icon as={FontAwesome5} name="sun" size="sm" color="white" />
            <Switch value={colorMode !== 'light'} />
            <Icon as={FontAwesome5} name="moon" size="sm" color="white" />
          </HStack>
        </Pressable>
      </HStack> */}
    </>
  )
}
