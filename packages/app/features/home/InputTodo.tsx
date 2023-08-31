import { useTodo } from 'app/zustand'
import { Button, Input, Spinner, Tooltip, XStack, YStack } from '@my/ui'
import { PlusCircle } from '@tamagui/lucide-icons'

export default function InputTodo() {
  const { text, setText, loading, setLoading, todoAdded } = useTodo()

  const handleButton = () => {
    const trimmedText = text.trim()
    if (trimmedText) {
      // Create and dispatch the thunk function itself
      setLoading('loading')
      todoAdded(trimmedText)
      // And clear out the text input
      setText('')
      setLoading('idle')
    }
  }

  let isLoading = loading === 'loading'
  let placeholder = isLoading ? '' : 'What needs to be done?'

  return (
    <YStack space>
      <XStack jc="space-between" space>
        <Input
          value={text}
          onChangeText={(text) => setText(text)}
          placeholder={placeholder}
          size="$4"
          w="90%"
          autoFocus
          disabled={isLoading}
        />
        <Tooltip>
          <Tooltip.Trigger>
            <Button size="$4" onPress={handleButton} alignSelf="center" icon={PlusCircle}>
              ADD
            </Button>
          </Tooltip.Trigger>
          <Tooltip.Content>
            <Tooltip.Arrow />
            Add a new Todo
          </Tooltip.Content>
        </Tooltip>
      </XStack>

      {isLoading ? (
        <XStack jc="center">
          <Spinner size="large" />
        </XStack>
      ) : null}
    </YStack>
  )
}
