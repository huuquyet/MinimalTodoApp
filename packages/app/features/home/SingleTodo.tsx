import {
  Adapt,
  Button,
  Checkbox,
  Paragraph,
  Select,
  Sheet,
  Square,
  Tooltip,
  XStack,
  YStack,
} from '@my/ui'
import { LinearGradient } from '@tamagui/linear-gradient'
import { Check, ChevronDown, ChevronUp, Trash } from '@tamagui/lucide-icons'
import { availableColors, useTodoStore } from 'app/zustand'
import { Platform } from 'react-native'

export const SingleTodo = ({ id }: { id: string }) => {
  const { selectTodoById, todoColorSelected, todoDeleted, todoToggled } = useTodoStore()
  // Call our `selectTodoById` with the state _and_ the ID value
  const todo = selectTodoById(id)!

  return (
    <XStack ai="center" gap>
      <Checkbox
        checked={todo.completed}
        onCheckedChange={() => todoToggled(id)}
        value={todo.text}
        labelledBy="Completed"
      >
        <Checkbox.Indicator>
          <Check />
        </Checkbox.Indicator>
      </Checkbox>
      <Button fg={1} onPress={() => todoToggled(id)} jc="flex-start" chromeless>
        <Paragraph textDecorationLine={todo.completed ? 'line-through' : 'none'}>
          {todo.text}
        </Paragraph>
      </Button>
      <Select
        onValueChange={(color: any) => todoColorSelected(id, color)}
        value={todo.color || '$color'}
      >
        <Select.Trigger w="$8" iconAfter={ChevronDown}>
          <Select.Value placeholder="Color">
            <Square size="$2" bc={todo.color || '$color'} />
          </Select.Value>
        </Select.Trigger>

        <Adapt when="sm" platform="touch">
          <Sheet native={Platform.OS !== 'web'} modal dismissOnSnapToBottom animation="quick">
            <Sheet.Frame>
              <Sheet.ScrollView>
                <Adapt.Contents />
              </Sheet.ScrollView>
            </Sheet.Frame>
            <Sheet.Overlay
              animation="lazy"
              enterStyle={{ opacity: 0 }}
              exitStyle={{ opacity: 0 }}
            />
          </Sheet>
        </Adapt>

        <Select.Content zi={200000}>
          <Select.ScrollUpButton ai="center" jc="center" pos="relative" w="100%" h="$3">
            <YStack zi={10}>
              <ChevronUp size={20} />
            </YStack>
            <LinearGradient
              start={[0, 0]}
              end={[0, 1]}
              fullscreen
              colors={['$background', '$backgroundTransparent']}
              br="$4"
            />
          </Select.ScrollUpButton>
          <Select.Viewport miw="$8">
            <Select.Group>
              <Select.Label>Color</Select.Label>
              {availableColors.map((color: any, i) => (
                <Select.Item index={i} key={color + id} value={color}>
                  <Select.ItemText>
                    <Square size="$2" bc={color} />
                  </Select.ItemText>
                  <Select.ItemIndicator ml="auto">
                    <Check size={16} />
                  </Select.ItemIndicator>
                </Select.Item>
              ))}
            </Select.Group>

            {Platform.OS !== 'web' && (
              <YStack pos="absolute" r={0} t={0} b={0} ai="center" jc="center" w="$4" pe="none">
                <ChevronDown />
              </YStack>
            )}
          </Select.Viewport>
          <Select.ScrollDownButton ai="center" jc="center" pos="relative" w="100%" h="$3">
            <YStack zi={10}>
              <ChevronDown size={20} />
            </YStack>
            <LinearGradient
              start={[0, 0]}
              end={[0, 1]}
              fullscreen
              colors={['$backgroundTransparent', '$background']}
              br="$4"
            />
          </Select.ScrollDownButton>
        </Select.Content>
      </Select>

      <Tooltip>
        <Tooltip.Trigger>
          <Button onPress={() => todoDeleted(id)} icon={Trash} />
        </Tooltip.Trigger>
        <Tooltip.Content>
          <Tooltip.Arrow />
          <Paragraph>Delete This Todo</Paragraph>
        </Tooltip.Content>
      </Tooltip>
    </XStack>
  )
}
