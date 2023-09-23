<script setup lang='ts'>
interface Props {
  modelValue: string
  must?: boolean
  layout?: 'horizontal' | 'vertical'
}
withDefaults(defineProps<Props>(), {
  layout: 'vertical',
})
const emit = defineEmits(['update:modelValue'])
const { t } = useI18n()

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
const { value: month, setValue: setMonth, errorMessage: errorMonthMsg } = useField<number>('month', (value) => {
  if (!value)
    return t('surveys_birthday_error')

  return ''
})
const { value: year, setValue: setYear, errorMessage: errorYearMsg } = useField<number>('year', (value) => {
  if (!value || value < 1900)
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
      return year.value && dayjs(`${year.value}`).isLeapYear() ? 29 : 28
  }

  return 31
})
const { value: day, setValue: setDay, errorMessage: errorDayMsg } = useField<number>('day', (value) => {
  if (!value || value > dayMax.value)
    return t('surveys_birthday_error')

  return ''
})

// 是否满足18岁
const isEnough = computed(() => {
  const yearStr = year.value ? year.value : ''
  const monthStr = month.value ? `-${month.value}` : ''
  const dayStr = day.value ? `-${day.value}` : ''

  if (year.value) {
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
  return true
})

const msg = computed(() => {
  if (!isEnough.value)
    return t('you_have_to_enough_18')
  if (month.value && day.value && day.value > dayMax.value)
    return t('surveys_birthday_error')

  return errorYearMsg.value || errorMonthMsg.value || errorDayMsg.value
})

function onInput() {
  if (year.value && month.value && day.value && !msg.value)
    emit('update:modelValue', `${year.value}-${month.value > 9 ? month.value : `0${month.value}`}-${day.value > 9 ? day.value : `0${day.value}`}`)
}
</script>

<template>
  <div class="base-input-birthday">
    <div :class="[layout]">
      <label>{{ t('time_birthday') }} <span v-if="must">*</span></label>
      <div class="input-wrap">
        <!-- 日 -->
        <input
          v-model="day" type="number" min="1" :max="dayMax" placeholder="DD" :class="{ error: msg }"
          @input="onInput"
        >
        <!-- 月 -->
        <select v-model="month" :class="{ error: msg }" @change="onInput">
          <option value="xx" disabled>
            {{ t('time_month') }}
          </option>
          <option v-for="m, i in monthList" :key="i" :value="m.value">
            {{ t(m.label) }}
          </option>
        </select>
        <!-- 年 -->
        <input v-model="year" :class="{ error: msg }" type="number" min="1900" placeholder="YYYY" @input="onInput">
      </div>
    </div>
    <div v-show="msg" class="msg">
      <BaseIcon class="error-icon" name="uni-warning" />
      <span>{{ msg }}</span>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.base-input-birthday {
  width: 100%;
  font-size: var(--tg-font-size-default);

  .vertical {
    display: flex;
    flex-direction: column;
    align-items: flex-start;

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

    span {
      font-size: var(--tg-font-size-xs);
      color: var(--tg-text-error);
      margin-left: var(--tg-spacing-4);
    }
  }

  .input-wrap {
    width: 100%;
    margin-bottom: var(--tg-spacing-6);
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0 var(--tg-spacing-11);

    input,
    select {
      border-radius: var(--tg-radius-default);
      background: var(--tg-secondary-dark);
      box-shadow: var(--tg-box-shadow);
      border-width: var(--tg-border-width-sm);
      border-style: solid;
      border-color: var(--tg-secondary-main);
      color: var(--tg-text-white);
      outline: none;
      padding: var(--tg-spacing-input-padding-vertical) var(--tg-spacing-input-padding-horizontal);
      transition: all ease .25s;
      line-height: 1;

      &:hover:not(.error) {
        border-color: var(--tg-text-grey);
      }

      &:focus:not(.error) {
        border-color: var(--tg-text-grey);
      }
    }

    .error {
      border-color: var(--tg-text-error);
    }

  }
}
</style>
