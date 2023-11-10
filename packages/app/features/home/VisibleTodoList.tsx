import { SingleTodo } from './SingleTodo'
import { useTodoStore } from 'app/zustand'
import { Paragraph, ScrollView, Separator, Spinner, YGroup, YStack } from '@my/ui'

export const VisibleTodoList = () => {
  const { loading, selectFilteredIds } = useTodoStore()
  const todoIds = selectFilteredIds()

  if (loading === 'LOADING') {
    return (
      <YStack ai="center">
        <Spinner size="large" />
      </YStack>
    )
  }

  return (
    <YStack paddingHorizontal="$4" space>
      {todoIds.length > 0 ? (
        <ScrollView>
          <YGroup als="center" size="$4" w="100%" space="$2" separator={<Separator />}>
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
