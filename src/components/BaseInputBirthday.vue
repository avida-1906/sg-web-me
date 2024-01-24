<script setup lang='ts'>
interface Props {
  modelValue?: string
  must?: boolean
  layout?: 'horizontal' | 'vertical'
  label?: string
}
const props = withDefaults(defineProps<Props>(), {
  layout: 'vertical',
})
const emit = defineEmits(['update:modelValue'])
const { t } = useI18n()

const dayInputRef = ref()
const yearInputRef = ref()
const showAllRed = ref(false)

const monthList = [
  { label: 'time_january', value: 1 },
  { label: 'time_february', value: 2 },
  { label: 'time_march', value: 3 },
  { label: 'time_april', value: 4 },
  { label: 'time_may', value: 5 },
  { label: 'time_june', value: 6 },
  { label: 'time_july', value: 7 },
  { label: 'time_august', value: 8 },
  { label: 'time_september', value: 9 },
  { label: 'time_october', value: 10 },
  { label: 'time_november', value: 11 },
  { label: 'time_december', value: 12 },
]
const {
  value: month, setValue: setMonth,
  errorMessage: errorMonthMsg,
  validate: valiMonth,
  resetField: resetMonthField,
} = useField<number>('month', (value) => {
  showAllRed.value = false
  if (!value)
    return t('surveys_birthday_error')

  return ''
}, { initialValue: 0 })
const {
  value: year,
  setValue: setYear,
  errorMessage: errorYearMsg,
  validate: valiYear,
  resetField: resetYearField,
} = useField<number>('year', (value) => {
  showAllRed.value = false
  if (!value)
    return t('surveys_birthday_error')
  if (value < 1900)
    return t('surveys_birthday_error')

  return ''
})

const dayMax = computed(() => {
  const have31 = [1, 3, 5, 7, 8, 10, 12]
  const have30 = [4, 6, 9, 11]

  if (month.value) {
    if (have31.includes(month.value))
      return 31

    if (have30.includes(month.value))
      return 30

    if (month.value === 2)
      return year.value && dayjs(`${year.value}-01-01`).isLeapYear() ? 29 : 28
  }

  return 31
})
const {
  value: day,
  setValue: setDay,
  errorMessage: errorDayMsg,
  validate: valiDay,
  resetField: resetDay,
} = useField<number>('day', (value) => {
  showAllRed.value = false
  if (!value)
    return t('surveys_birthday_error')
  if (value > dayMax.value)
    return t('day_no_max', { delta: dayMax.value })
  if (!(month.value >= 1 && month.value <= 12))
    resetMonthField()
  if (year.value === '' || year.value === undefined)
    resetYearField()

  return ''
})

if (props.modelValue) {
  const temp = props.modelValue.split('-')
  setYear(+temp[0])
  setMonth(+temp[1])
  setDay(+temp[2])
}

const curYear = dayjs().year()
const curMonth = dayjs().month() + 1
const curDay = dayjs().date()
const isOver120 = computed(() => {
  if (+year.value > 0 && +day.value > 0
  && +day.value <= +dayMax.value && +month.value > 0) {
    if (curYear - year.value >= 120) {
      if (curYear - year.value > 120) {
        return true
      }
      else {
        if (curMonth >= month.value) {
          if (curMonth > month.value) {
            return true
          }
          else {
            if (curDay > day.value)
              return true
            else return false
          }
        }
        else {
          return false
        }
      }
    }
    return false
  }
  return undefined
})

// 是否满足18岁
const isEnough = computed(() => {
  const yearStr = year.value ? year.value : ''
  const monthStr = month.value ? `-${month.value}` : ''
  const dayStr = day.value ? `-${day.value}` : ''

  if (year.value && +year.value >= 1900 && !errorDayMsg.value && !errorMonthMsg.value) {
    const birthDayjs = dayjs(month.value ? yearStr + monthStr + dayStr : yearStr)
    const currentDate = dayjs()
    const age = currentDate.diff(birthDayjs, 'year')

    if (month.value && age === 18) {
      const birthMonth = birthDayjs.month()
      const currentMonth = currentDate.month()

      if (day.value && currentMonth === birthMonth) {
        const birthDay = birthDayjs.date()
        const currentDay = currentDate.date()

        return currentDay >= birthDay
      }

      if (currentMonth >= birthMonth)
        return true
    }
    return month.value ? age > 18 : age >= 18
  }
  return false
})

const msg = computed(() => {
  if (day.value > dayMax.value)
    return t('day_no_max', { delta: dayMax.value })
  if (!day.value || !month.value || !year.value)
    return t('surveys_birthday_error')
  if (isOver120.value === true)
    return t('max_age', { delta: 120 })
  if (!isEnough.value)
    return t('you_have_to_enough_18')

  return errorDayMsg.value || errorMonthMsg.value || errorYearMsg.value
})

const isValid = computed(() => {
  return !!(!isOver120.value && isEnough.value && +month.value >= 1
  && +month.value <= 12
  && +day.value > 0 && +day.value <= +dayMax.value && +year.value >= 1900)
})

function onInput() {
  if (day.value > 0 && day.value <= dayMax.value)
    checkValidTip(dayInputRef.value, '')

  if (year.value >= 1900)
    checkValidTip(yearInputRef.value, '')

  if (year.value && month.value && day.value && !msg.value)
    emit('update:modelValue', `${year.value}-${month.value > 9 ? month.value : `0${month.value}`}-${day.value > 9 ? day.value : `0${day.value}`}`)
}
async function valiBirthday() {
  await valiMonth()
  await valiYear()
  await valiDay()
  if (+day.value <= 0)
    checkValidTip(dayInputRef.value, t('max_value', { delta: 1 }))

  else if (+year.value < 1900)
    checkValidTip(yearInputRef.value, t('max_value', { delta: 1900 }))

  if (!isValid.value)
    showAllRed.value = true

  return isValid.value
}

function checkValidTip(el: HTMLObjectElement, msg: string) {
  el?.checkValidity()
  el?.setCustomValidity(msg) // 如果是 '', 会提示原生的校验提示
  el?.reportValidity()
}
function resetBirthday() {
  resetMonthField()
  resetYearField()
  resetDay()
}

onMounted(() => {
  if (props.modelValue) {
    const arr = props.modelValue.split('-')
    setYear(+arr[0])
    setMonth(+arr[1])
    setDay(+arr[2])
  }
})
defineExpose({ valiBirthday, msg, isValid, resetBirthday })
</script>

<template>
  <div class="base-input-birthday">
    <div :class="[layout]">
      <label>{{ props.label }} <span v-if="must">*</span></label>
      <div class="input-wrap">
        <!-- 日 -->
        <input
          ref="dayInputRef"
          v-model="day"
          type="number"
          :min="1"
          :max="dayMax"
          autocomplete="on"
          :placeholder="t('reg_day')"
          :class="{ error: errorDayMsg || showAllRed }"
          @input="onInput"
        >
        <!-- 月 -->
        <div class="select-wrap">
          <select
            v-model="month"
            required
            :class="{
              'error': errorMonthMsg || showAllRed,
              'placeholder-select': monthList.filter(m => m.value === month).length === 0,
            }"
            @input="onInput"
          >
            <option class="select-placeholder" value="0" disabled selected>
              {{ t('time_month') }}
            </option>
            <option v-for="m, i in monthList" :key="i" :value="m.value">
              {{ t(m.label) }}
            </option>
          </select>
          <div class="dropdown-icon-wrap">
            <BaseIcon name="uni-arrow-up-small" />
          </div>
        </div>
        <!-- 年 -->
        <input
          ref="yearInputRef"
          v-model="year"
          :class="{ error: errorYearMsg || showAllRed }"
          type="number"
          :min="1900"
          placeholder="YYYY"
          @input="onInput"
        >
      </div>
    </div>
    <div v-show="showAllRed || errorDayMsg" class="msg">
      <!-- <BaseIcon class="error-icon" name="uni-warning" /> -->
      <BaseIcon class="error-icon" name="uni-warning-color" />
      <span>{{ msg || t('surveys_birthday_error') }}</span>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.placeholder-select {
  color: var(--tg-text-placeholder) !important;
  font-weight: var(--tg-font-weight-semibold);
}
.base-input-birthday {
  width: 100%;
  font-size: var(--tg-font-size-default);

  .vertical {
    // display: flex;
    // flex-direction: column;
    // align-items: flex-start;

    label {
      margin-bottom: var(--tg-spacing-4);
      font-weight: var(--tg-font-weight-semibold);

      span {
        color: var(--tg-text-error);
      }
    }

  }

  .horizontal {
    display: flex;
    align-items: center;

    label {
      width: 100px;
      margin-right: var(--tg-spacing-10);
    }
  }

  label {
    color: var(--tg-text-lightgrey);
  }

  .msg {
    font-size: var(--tg-font-size-md);
    display: flex;
    align-items: center;
    padding-top: 8px;
    padding-bottom: 4px;
    --tg-icon-color: var(--tg-text-error-sub);
    .error-icon {
      font-size: var(--tg-font-size-xs);
    }

    span {
      font-size: var(--tg-font-size-xs);
      color: var(--tg-text-error-sub);
      margin-left: var(--tg-spacing-8);
    }
  }

  .input-wrap {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0 var(--tg-spacing-8);

    input,
    select {
      width: 100%;
      border-radius: var(--tg-radius-default);
      background: var(--tg-secondary-dark);
      box-shadow: var(--tg-box-shadow);
      border-width: var(--tg-border-width-sm);
      border-style: solid;
      border-color: var(--tg-border-color-main);
      color: var(--tg-text-white);
      outline: none;
      padding: var(--tg-spacing-input-padding-vertical) 7px;
      transition: all ease .25s;
      line-height: 1;
      font-weight: var(--tg-font-weight-semibold);

      &:hover:not(.error) {
        border-color: var(--tg-border-color-deep-grey);
      }

      &:focus:not(.error) {
        border-color: var(--tg-border-color-deep-grey);
      }
      &::placeholder {
        color: var(--tg-text-placeholder) !important;
        font-weight: var(--tg-font-weight-semibold);
      }
    }

    .select-wrap {
      position: relative;
      flex-grow: 1;
      width: 100%;
      display: flex;
      .dropdown-icon-wrap {
        position: absolute;
        top: 52%;
        right: 7px;
        color: var(--tg-secondary-light);
        transform: translateY(-50%);
        pointer-events: none;
        cursor: pointer;
        --tg-icon-color: var(--tg-secondary-light);
      }
    }

    .error {
      border-color: var(--tg-text-error);
    }

  }
}
</style>
