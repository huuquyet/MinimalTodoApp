import SingleTodo from './SingleTodo'
import { useTodo } from 'app/zustand'
import { ScrollView, Spinner, Text, YStack } from '@my/ui'

export default function VisibleTodoList() {
  const { todos, loading, selectTodoIds } = useTodo()
  const todoIds = selectTodoIds

  if (loading === 'loading') {
    return (
      <YStack jc="center">
        <Spinner />
      </YStack>
    )
  }

  return (
    <YStack p="$4" space>
      {todoIds.length > 0 ? (
        <ScrollView>
          <YStack>
            {todoIds.map((todoId) => (
              <SingleTodo key={todoId} id={todoId} />
            ))}
          </YStack>
        </ScrollView>
      ) : (
        <YStack p="$4" ai="center">
          <Text>Nothing here 🙈🐘</Text>
        </YStack>
      )}
    </YStack>
  )
}
