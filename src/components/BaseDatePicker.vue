<script lang="ts" setup>
type DateLabel = 'start' | 'end'
interface Props {
  modelValue: Array<string>
  initStartDate?: string | number | Date
  initEndDate?: string | number | Date
}

const props = defineProps<Props>()

const emit = defineEmits(['update:modelValue', 'change'])

const today = dayjs(new Date()).format('YYYY-MM-DD')

const { bool: arrowUp, setFalse: setUpFalse, setTrue: setUpTrue } = useBoolean(false)

const startDateEle = ref()
const endDateEle = ref()
const startDate = ref(props.initStartDate !== undefined
  ? dayjs(props.initStartDate).format('YYYY-MM-DD')
  : today)
const endDate = ref(props.initEndDate !== undefined
  ? dayjs(props.initEndDate).format('YYYY-MM-DD')
  : today)

const isValid = computed(() => startDate.value <= endDate.value)

function togglePicker(ty: DateLabel) {
  if (ty === 'start')
    startDateEle.value.showPicker()
  else
    endDateEle.value.showPicker()
}

function dateChange(e: any, ty: DateLabel) {
  const value = e.target.value
  if (ty === 'start')
    startDate.value = value
  else
    endDate.value = e.target.value

  setUpFalse()
  const temp = [
    dayjs(startDate.value).startOf('day').format('YYYY-MM-DD HH:mm:ss'),
    dayjs(endDate.value).endOf('day').format('YYYY-MM-DD HH:mm:ss'),
  ]
  emit('update:modelValue', temp)
  emit('change', temp)
}

function inputFocus() {
  setUpTrue()
}

function inputBlur() {
  setUpFalse()
}

onMounted(() => {
  const temp = [
    dayjs(startDate.value).startOf('day').format('YYYY-MM-DD HH:mm:ss'),
    dayjs(endDate.value).endOf('day').format('YYYY-MM-DD HH:mm:ss'),
  ]
  emit('update:modelValue', temp)
  emit('change', temp)
})
</script>

<template>
  <div class="date-picker-outer">
    <div class="base-date-picker">
      <div class="wrap">
        <label @click="togglePicker('start')">
          <span>{{ startDate }}</span>
          <input
            ref="startDateEle"
            type="date"
            name="startDate"
            :value="startDate"
            :max="endDate"
            @change="e => dateChange(e, 'start')"
            @focus="inputFocus"
            @blur="inputBlur"
          >
        </label>
        <span class="separator">-</span>
        <label @click="togglePicker('end')">
          <span>{{ endDate }}</span>
          <input
            ref="endDateEle"
            type="date"
            name="endDate"
            :value="endDate"
            :min="startDate"
            :max="today"
            @change="e => dateChange(e, 'end')"
            @focus="inputFocus"
            @blur="inputBlur"
          >
        </label>
      </div>
      <BaseIcon :class="{ 'arrow-up': arrowUp }" name="uni-arrow-down" />
    </div>
    <div v-if="!isValid" class="error">
      <BaseIcon name="uni-warning" /><span>{{ $t('date_picker_error') }}</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.date-picker-outer {
  position: relative;
  .error {
    position: absolute;
    display: flex;
    align-items: center;
    left: 0;
    bottom: -24px;
    font-size: var(--tg-font-size-md);
    color: var(--tg-text-error);
    line-height: var(--tg-spacing-24);
    span {
      font-size: var(--tg-font-size-xs);
      margin-left: var(--tg-spacing-4);
    }
  }
}
.base-date-picker {
  display: flex;
  gap: var(--tg-spacing-8);
  width: 220px;
  border-radius: var(--tg-radius-default);
  border: 2px solid var(--tg-secondary-main);
  background: var(--tg-secondary-dark);
  padding: var(--tg-spacing-8) var(--tg-spacing-12);
  align-items: center;
  justify-content: space-between;
  font-size: var(--tg-font-size-default);
  font-weight: var(--tg-font-weight-semibold);
  color: var(--tg-secondary-light);
  line-height: 1.5;
  transition: border-color 200ms ease;
  &:hover {
    border-color: var(--tg-border-color-deep-grey);
  }
  .separator {
    color: var(--tg-text-white);
  }
  .wrap {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    label {
      display: block;
      position: relative;
      cursor: pointer;
      input {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        z-index: -10;
      }
    }
  }
  > .app-svg-icon {
    transform-origin: center center;
    transition: transform 250ms;
    transform: rotate(0deg);
    &.arrow-up {
      transform: rotate(180deg);
    }
  }
}
</style>
