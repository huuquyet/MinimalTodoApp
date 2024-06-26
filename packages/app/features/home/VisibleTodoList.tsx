import { Paragraph, ScrollView, Separator, Spinner, YGroup, YStack } from '@my/ui'
import { useTodoStore } from 'app/zustand'
import { SingleTodo } from './SingleTodo'

export const VisibleTodoList = () => {
  const { loading, selectFilteredIds } = useTodoStore()
  const todoIds = selectFilteredIds()

  if (loading === 'LOADING') {
    return (
      <YStack ai="center" gap="$4">
        <Spinner size="large" />
      </YStack>
    )
  }

  return (
    <ScrollView gap="$4">
      {todoIds.length > 0 ? (
        <YGroup px="$4" als="center" size="$4" w="100%" gap="$4" separator={<Separator />}>
          {todoIds.map((todoId) => (
            <YGroup.Item key={todoId}>
              <SingleTodo id={todoId} />
            </YGroup.Item>
          ))}
        </YGroup>
      ) : (
        <YStack p="$4" ai="center" gap="$4">
          <Paragraph>Nothing here 🙈🐘</Paragraph>
        </YStack>
      )}
    </ScrollView>
  )
}
