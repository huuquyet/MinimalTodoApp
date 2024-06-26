import { Button, Circle, Paragraph, ToggleGroup, Tooltip, XGroup, XStack, YStack } from '@my/ui'
import { CheckCheck, Filter, Trash2 } from '@tamagui/lucide-icons'
import { availableColors, statusFilters, useTodoStore } from 'app/zustand'

const StatusFilter = ({ value: status, onChange: statusFilterChanged }) => {
  return (
    <XStack jc="center" ai="center" gap="$4">
      <XGroup size="$4">
        {statusFilters.map((item) => {
          return (
            <XGroup.Item key={item}>
              <Button
                onPress={() => statusFilterChanged(item)}
                size="$2"
                icon={item === status ? <Filter /> : undefined}
                chromeless={item !== status ? true : undefined}
              >
                {item}
              </Button>
            </XGroup.Item>
          )
        })}
      </XGroup>
    </XStack>
  )
}

const ColorFilters = ({ value: colors, onChange: colorFilterChanged }) => (
  <XStack jc="center" ai="center" gap="$4">
    <ToggleGroup
      type="multiple"
      orientation="horizontal"
      size="$4"
      onValueChange={() => colorFilterChanged(colors)}
    >
      {availableColors.map((color: any) => (
        <ToggleGroup.Item key={color} value={color} aria-label={color}>
          <Circle bc={color} />
        </ToggleGroup.Item>
      ))}
    </ToggleGroup>
  </XStack>
)

export const FilterTodo = () => {
  const {
    status,
    colors,
    markAllCompleted,
    clearAllCompleted,
    colorFilterChanged,
    statusFilterChanged,
  } = useTodoStore()

  return (
    <XStack px="$4" jc="space-between" ai="center" gap="$4">
      <Tooltip>
        <Tooltip.Trigger>
          <Button size="$4" onPress={markAllCompleted} icon={CheckCheck} circular />
        </Tooltip.Trigger>
        <Tooltip.Content>
          <Tooltip.Arrow />
          <Paragraph>Mark All Todos Completed</Paragraph>
        </Tooltip.Content>
      </Tooltip>

      <YStack gap="$4">
        <StatusFilter value={status} onChange={statusFilterChanged} />
        <ColorFilters value={colors} onChange={colorFilterChanged} />
      </YStack>

      <Tooltip>
        <Tooltip.Trigger>
          <Button size="$4" onPress={clearAllCompleted} icon={Trash2} circular />
        </Tooltip.Trigger>
        <Tooltip.Content>
          <Tooltip.Arrow />
          <Paragraph>Clear All Completed Todos</Paragraph>
        </Tooltip.Content>
      </Tooltip>
    </XStack>
  )
}
