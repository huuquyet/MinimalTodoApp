import { availableColors, capitalize, statusFilters } from 'app/common/constants'
import { useTodo } from 'app/zustand'
import { Button, Checkbox, Stack, Tooltip, XStack, YStack } from '@my/ui'
import { CheckCheck, Filter, Trash } from '@tamagui/lucide-icons'

const StatusFilter = ({ value: status, onChange }) => {
  return (
    <XStack jc="center" space>
      {Object.keys(statusFilters).map((item) => (
        <Button key={item} onPress={() => onChange(item)} icon={Filter}>
          {item}
        </Button>
      ))}
    </XStack>
  )
}

const ColorFilters = ({ value: colors, onChange }) => (
  <XStack space jc="center">
    {availableColors.map((color) => (
      <Checkbox
        key={color}
        name={color}
        checked={colors.includes(color)}
        onCheckedChange={() => onChange(color, colors.includes(color) ? 'removed' : 'added')}
        value={colors.includes(color)}
      >
        {capitalize(color)}
      </Checkbox>
    ))}
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
    <Stack bottom={0} w="100%" zIndex={1}>
      <YStack space={2}>
        <XStack justifyContent="space-between" m={1}>
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
    </Stack>
  )
}
