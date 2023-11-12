import { Button, Input, Paragraph, Tooltip, XStack } from '@my/ui'
import { PlusCircle } from '@tamagui/lucide-icons'
import { useTodoStore } from 'app/zustand'
import { useRef } from 'react'
import { TextInput } from 'react-native'

export const InputTodo = () => {
  const { text, setText, loading, setLoading, todoAdded } = useTodoStore()
  const inputRef = useRef<TextInput>(null)

  const handleInput = (key) => {
    if (key === 'Enter') {
      handleButton()
      inputRef.current?.focus()
    }
  }

  const handleButton = () => {
    const trimmedText = text.trim()
    if (trimmedText) {
      // Create and dispatch the thunk function itself
      setLoading('LOADING')
      todoAdded(trimmedText)
      // And clear out the text input
      setText('')
      setLoading('IDLE')
    }
  }

  const placeholder = loading !== 'IDLE' ? '' : 'What needs to be done?'

  return (
    <XStack mt="$9" jc="space-between" px="$4" space>
      <Input
        value={text}
        onChangeText={(text) => setText(text)}
        onKeyPress={(e) => handleInput(e.nativeEvent.key)}
        placeholder={placeholder}
        size="$4"
        fg={1}
        autoFocus
        ref={inputRef}
        disabled={loading !== 'IDLE'}
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
