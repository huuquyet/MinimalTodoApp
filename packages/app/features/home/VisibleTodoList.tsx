import SingleTodo from './SingleTodo'
import { useTodo } from 'app/zustand'
import { ScrollView, Spinner, Stack, Text, YStack } from '@my/ui'

export default function VisibleTodoList() {
  const { todos, loading, selectTodoIds } = useTodo()
  const todoIds = selectTodoIds

  if (loading === 'loading') {
    return (
      <Stack jc="center">
        <Spinner />
      </Stack>
    )
  }

  return (
    <YStack ai="center" jc="center" p="$4" space>
      {todoIds.length > 0 ? (
        <ScrollView>
          <YStack>
            {todoIds.map((todoId) => (
              <SingleTodo key={todoId} id={todoId} />
            ))}
          </YStack>
        </ScrollView>
      ) : (
        <Stack p="$4" jc="center">
          <Text>Nothing here 🙈🐘</Text>
        </Stack>
      )}
    </YStack>
  )
}
