import { Platform } from 'react-native'
import { LinearGradient } from '@tamagui/linear-gradient'
import { Check, ChevronDown, ChevronUp, Trash } from '@tamagui/lucide-icons'

import { availableColors, useTodo } from 'app/zustand'
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

export const SingleTodo = ({ id }: { id: string }) => {
  const { selectTodoById, todoColorSelected, todoDeleted, todoToggled } = useTodo()
  // Call our `selectTodoById` with the state _and_ the ID value
  const todo = selectTodoById(id)!

  return (
    <XStack ai="center" space>
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
        onValueChange={(color) => todoColorSelected(id, color)}
        value={todo.color || '$color'}
      >
        <Select.Trigger w="$8" iconAfter={ChevronDown}>
          <Select.Value placeholder="Color">
            <Square size="$2" bc={todo.color || '$color'} />
          </Select.Value>
        </Select.Trigger>

        <Adapt when="sm" platform="touch">
          <Sheet
            native={Platform.OS !== 'web'}
            modal
            dismissOnSnapToBottom
            animationConfig={{
              type: 'spring',
              damping: 20,
              mass: 1.2,
              stiffness: 250,
            }}
          >
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

        <Select.Content zIndex={200000}>
          <Select.ScrollUpButton
            alignItems="center"
            justifyContent="center"
            position="relative"
            width="100%"
            height="$3"
          >
            <YStack zIndex={10}>
              <ChevronUp size={20} />
            </YStack>
            <LinearGradient
              start={[0, 0]}
              end={[0, 1]}
              fullscreen
              colors={['$background', '$backgroundTransparent']}
              borderRadius="$4"
            />
          </Select.ScrollUpButton>
          <Select.Viewport minWidth="$8">
            <Select.Group>
              <Select.Label>Color</Select.Label>
              {availableColors.map((color, i) => (
                <Select.Item index={i} key={color} value={color}>
                  <Select.ItemText>
                    <Square size="$2" bc={color} />
                  </Select.ItemText>
                  <Select.ItemIndicator marginLeft="auto">
                    <Check size={16} />
                  </Select.ItemIndicator>
                </Select.Item>
              ))}
            </Select.Group>

            {Platform.OS !== 'web' && (
              <YStack
                position="absolute"
                right={0}
                top={0}
                bottom={0}
                alignItems="center"
                justifyContent="center"
                width={'$4'}
                pointerEvents="none"
              >
                <ChevronDown />
              </YStack>
            )}
          </Select.Viewport>
          <Select.ScrollDownButton
            alignItems="center"
            justifyContent="center"
            position="relative"
            width="100%"
            height="$3"
          >
            <YStack zIndex={10}>
              <ChevronDown size={20} />
            </YStack>
            <LinearGradient
              start={[0, 0]}
              end={[0, 1]}
              fullscreen
              colors={['$backgroundTransparent', '$background']}
              borderRadius="$4"
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
