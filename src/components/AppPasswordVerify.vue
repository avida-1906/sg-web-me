<script setup lang='ts'>
interface Props {
  password: string
  hasErrorMsg?: boolean
  pwdTouched?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  password: '',
  hasErrorMsg: false,
})
const emit = defineEmits(['pass'])

const { t } = useI18n()

const upperLowerRegOk = computed(() => upperLowerReg.test(props.password))
const lastOneNumberRegOk = computed(() => lastOneNumberReg.test(props.password))
const lengthOk = computed(() => props.password.length >= 8)

watch(() => props.password, () => {
  emit('pass', upperLowerRegOk.value
  && lastOneNumberRegOk.value
  && lengthOk.value)
})
</script>

<template>
  <div
    class="app-password"
    :class="{
      'all-ok': upperLowerRegOk && lastOneNumberRegOk && lengthOk,
      'all-not-ok': !upperLowerRegOk && !lastOneNumberRegOk && !lengthOk,
      'has-error-msg': hasErrorMsg,
      'pwd-not-touched': !pwdTouched,
    }"
  >
    <div class="item">
      <BaseIcon v-if="upperLowerRegOk" class="hook-2" name="uni-hook" />
      <BaseIcon v-else class="hook-1" name="uni-hook" />
      {{ t('pop_up_create_account_uppercase_lowercase_letter') }}
    </div>
    <div class="item">
      <BaseIcon v-if="lastOneNumberRegOk" class="hook-2" name="uni-hook" />
      <BaseIcon v-else class="hook-1" name="uni-hook" />
      {{ t('pop_up_create_account_passcode_least_1_number') }}
    </div>
    <div class="item">
      <BaseIcon v-if="lengthOk" class="hook-2" name="uni-hook" />
      <BaseIcon v-else class="hook-1" name="uni-hook" />
      {{ t('least_8_characters') }}
    </div>
  </div>
</template>

<style lang='scss' scoped>
.hook-1 {
  --tg-icon-color: var(--tg-secondary-light);
  font-size: var(--tg-font-size-base);
}
.hook-2 {
  --tg-icon-color: var(--tg-text-green-deep);
  font-size: var(--tg-font-size-base);
}
.app-password {
  display: flex;
  flex-direction: column;
  gap: var(--tg-spacing-8);
  color: var(--tg-text-lightgrey);
  font-size: var(--tg-font-size-xs);
  margin-top: var(--tg-spacing-8);
  margin-bottom: var(--tg-spacing-4);
  &.all-ok {
    margin-top: var(--tg-spacing-8);
  }
  &.has-error-msg {
    margin-top: var(--tg-spacing-4);
  }
  &.pwd-not-touched {
    margin-top: var(--tg-spacing-8);
  }
  .item {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: var(--tg-spacing-8);
    line-height: var(--tg-spacing-16);
  }
}
</style>
