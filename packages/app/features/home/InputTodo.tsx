import { useTodo } from 'app/zustand'
import { Button, Input, Paragraph, Tooltip, XStack } from '@my/ui'
import { PlusCircle } from '@tamagui/lucide-icons'

export const InputTodo = () => {
  const { text, setText, loading, setLoading, todoAdded } = useTodo()

  const handleInput = (key) => {
    if (key === 'Enter') {
      handleButton()
    }
  }

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

  const placeholder = loading !== 'idle' ? '' : 'What needs to be done?'

  return (
    <XStack jc="space-between" p="$4" space>
      <Input
        value={text}
        onChangeText={(text) => setText(text)}
        onKeyPress={(e) => handleInput(e.nativeEvent.key)}
        placeholder={placeholder}
        size="$4"
        fg={1}
        autoFocus
        disabled={loading !== 'idle'}
      />
      <Tooltip>
        <Tooltip.Trigger>
          <Button size="$4" onPress={handleButton} icon={PlusCircle}>
            ADD
          </Button>
        </Tooltip.Trigger>
        <Tooltip.Content>
          <Tooltip.Arrow />
          <Paragraph>Add A New Todo</Paragraph>
        </Tooltip.Content>
      </Tooltip>
    </XStack>
  )
}
