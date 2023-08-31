import { SingleTodo } from './SingleTodo'
import { useTodo } from 'app/zustand'
import { Paragraph, ScrollView, Spinner, YGroup, YStack } from '@my/ui'

export const VisibleTodoList = () => {
  const { todos, loading, selectTodoIds } = useTodo()
  const todoIds = selectTodoIds

  if (loading === 'loading') {
    return (
      <YStack ai="center">
        <Spinner size="large" />
      </YStack>
    )
  }

  return (
    <YStack p="$4" space>
      {todoIds.length > 0 ? (
        <ScrollView>
          <YGroup alignSelf="center" size="$4" w='100%'>
            {todoIds.map((todoId) => (
              <YGroup.Item key={todoId}>
                <SingleTodo id={todoId} />
              </YGroup.Item>
            ))}
          </YGroup>
        </ScrollView>
      ) : (
        <YStack p="$4" ai="center">
          <Paragraph>Nothing here 🙈🐘</Paragraph>
        </YStack>
      )}
    </YStack>
  )
}
