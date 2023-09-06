import { availableColors, capitalize } from 'app/common/constants'
import { useTodo } from 'app/zustand'
import { Button, Checkbox, Paragraph, Select, Square, Tooltip, XStack } from '@my/ui'
import { Check, ChevronDown, Trash } from '@tamagui/lucide-icons'

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
        <Select.Content zIndex={200000}>
          <Select.ScrollUpButton />
          <Select.Viewport>
            <Select.Group>
              <Select.Label>Color</Select.Label>
              {availableColors.map((color, i) => (
                <Select.Item index={i} key={color} value={color}>
                  <Select.ItemText>
                    <Square size="$2" bc={color} />
                  </Select.ItemText>
                </Select.Item>
              ))}
            </Select.Group>
          </Select.Viewport>
          <Select.ScrollDownButton />
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
