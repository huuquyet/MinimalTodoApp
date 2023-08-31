import { availableColors, capitalize, statusFilters } from 'app/common/constants'
import { useTodo } from 'app/zustand'
import { Button, ToggleGroup, Tooltip, XGroup, XStack, YStack } from '@my/ui'
import { CheckCheck, Filter, Trash } from '@tamagui/lucide-icons'

const StatusFilter = ({ value: status, onChange }) => {
  return (
    <XStack jc="center" ai="center" space>
      <XGroup orientation="horizontal" size="$4">
        {Object.keys(statusFilters).map((item) => (
          <XGroup.Item key={item}>
            <Button onPress={() => onChange(item)} icon={Filter} size="$4">
              {item}
            </Button>
          </XGroup.Item>
        ))}
      </XGroup>
    </XStack>
  )
}

const ColorFilters = ({ value: colors, onChange }) => (
  <XStack jc="center" ai="center" space>
    <ToggleGroup
      type="multiple"
      orientation="horizontal"
      size="$6"
      onValueChange={(colors) => onChange(colors)}
    >
      {availableColors.map((color) => (
        <ToggleGroup.Item key={color} value={color} aria-label={color} backgroundColor={color} />
      ))}
    </ToggleGroup>
  </XStack>
)

export default function FilterTodo() {
  const {
    status,
    colors,
    markAllCompleted,
    clearAllCompleted,
    colorFilterChanged,
    statusFilterChanged,
  } = useTodo()

  return (
    <YStack zIndex={1} p="$4" w="97%" pos="absolute" b={0} space>
      <XStack p="$4" jc="space-between" space>
        <Tooltip>
          <Tooltip.Trigger>
            <Button onPress={markAllCompleted} icon={CheckCheck}>
              Mark All Completed
            </Button>
          </Tooltip.Trigger>
          <Tooltip.Content>
            <Tooltip.Arrow />
            Mark All Completed
          </Tooltip.Content>
        </Tooltip>
        <Tooltip>
          <Tooltip.Trigger>
            <Button onPress={clearAllCompleted} icon={Trash}>
              CLEAR COMPLETED
            </Button>
          </Tooltip.Trigger>
          <Tooltip.Content>
            <Tooltip.Arrow />
            Clear All Completed
          </Tooltip.Content>
        </Tooltip>
      </XStack>

      <StatusFilter value={status} onChange={statusFilterChanged} />
      <ColorFilters value={colors} onChange={colorFilterChanged} />
    </YStack>
  )
}
