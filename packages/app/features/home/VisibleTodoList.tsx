import { SingleTodo } from './SingleTodo'
import { useTodo } from 'app/zustand'
import { Paragraph, ScrollView, Separator, Spinner, YGroup, YStack } from '@my/ui'

export const VisibleTodoList = () => {
  const { loading, selectFilteredIds } = useTodo()
  const todoIds = selectFilteredIds()

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
          <YGroup alignSelf="center" size="$4" w="100%" separator={<Separator />} space="$2">
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
