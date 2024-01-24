<script lang="ts" setup>
type DateLabel = 'start' | 'end'
interface Props {
  modelValue: Array<string>
  initStartDate?: string | number | Date
  initEndDate?: string | number | Date
  min?: string | number | Date
  max?: string | number | Date
}

const props = defineProps<Props>()

const emit = defineEmits(['update:modelValue', 'change'])

const today = dayjs(new Date()).format('YYYY-MM-DD')

const { bool: arrowUp1, setFalse: setUpFalse1, setTrue: setUpTrue1 } = useBoolean(false)
const { bool: arrowUp2, setFalse: setUpFalse2, setTrue: setUpTrue2 } = useBoolean(false)

const startDateEle = ref()
const endDateEle = ref()
const startDate = ref(props.initStartDate !== undefined
  ? dayjs(props.initStartDate).format('YYYY-MM-DD')
  : today)
const endDate = ref(props.initEndDate !== undefined
  ? dayjs(props.initEndDate).format('YYYY-MM-DD')
  : today)

const startDateLabel = computed(() => timeToDateFormat2(dayjs(startDate.value)))
const endDateLabel = computed(() => timeToDateFormat2(dayjs(endDate.value)))

const minDate = computed(() =>
  props.min === undefined ? undefined : dayjs(props.min).format('YYYY-MM-DD'))
const maxDate = computed(() =>
  props.max === undefined ? today : dayjs(props.max).format('YYYY-MM-DD'))

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

  setUpFalse1()
  setUpFalse2()
  const temp = [
    dayjs(startDate.value).startOf('day').format('YYYY-MM-DD HH:mm:ss'),
    dayjs(endDate.value).endOf('day').format('YYYY-MM-DD HH:mm:ss'),
  ]
  emit('update:modelValue', temp)
  emit('change', temp)
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
    <div class="base-date-picker" @click="togglePicker('start')">
      <div class="wrap">
        <label>
          <span>{{ startDateLabel }}</span>
          <input
            ref="startDateEle"
            type="date"
            name="startDate"
            :value="startDate"
            :min="minDate"
            :max="endDate"
            @change="e => dateChange(e, 'start')"
            @focus="setUpTrue1"
            @blur="setUpFalse1"
          >
        </label>
      </div>
      <BaseIcon :class="{ 'arrow-up': arrowUp1 }" name="uni-arrow-down" />
    </div>
    <div class="base-date-picker" @click="togglePicker('end')">
      <div class="wrap">
        <label class="end">
          <span>{{ endDateLabel }}</span>
          <input
            ref="endDateEle"
            type="date"
            name="endDate"
            :value="endDate"
            :min="startDate"
            :max="maxDate"
            @change="e => dateChange(e, 'end')"
            @focus="setUpTrue2"
            @blur="setUpFalse2"
          >
        </label>
      </div>
      <BaseIcon :class="{ 'arrow-up': arrowUp2 }" name="uni-arrow-down" />
    </div>
    <div v-if="!isValid" class="error">
      <BaseIcon name="uni-warning" /><span>{{ $t('date_picker_error') }}</span>
    </div>
  </div>
</template>

<style lang="scss">
:root{
--tg-base-date-picker-width: 220px;
--tg-base-date-picker-bother: 2px solid var(--tg-secondary-main);
--tg-base-date-picker-font-size: var(--tg-font-size-default);
--tg-base-date-picker-padding: var(--tg-spacing-8) var(--tg-spacing-12);
--tg-base-date-picker-font-weight: var(--tg-font-weight-semibold);
--tg-base-date-picker-color: var(--tg-secondary-light);
}
</style>

<style lang="scss" scoped>
.date-picker-outer {
  position: relative;
  display: flex;
  align-items: center;
  gap: var(--tg-spacing-16);
  .error {
    display: flex;
    align-items: center;
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
  cursor: pointer;
  display: flex;
  gap: var(--tg-spacing-8);
  width: var(--tg-base-date-picker-width);
  border-radius: var(--tg-radius-default);
  border: var(--tg-base-date-picker-bother);
  background: var(--tg-secondary-dark);
  padding: var(--tg-base-date-picker-padding);
  align-items: center;
  justify-content: space-between;
  font-size: var(--tg-base-date-picker-font-size);
  font-weight: var(--tg-base-date-picker-font-weight);
  color: var(--tg-base-date-picker-color);
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
    gap: 4px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    label {
      display: block;
      position: relative;

      height: 100%;
      line-height: 21px;
      min-height: 21px;
      text-align: left;
      white-space: nowrap;
      input {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        z-index: -10;
        opacity: 0;
      }
    }
    label.end {
      flex: 1;
      text-align: left;
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
