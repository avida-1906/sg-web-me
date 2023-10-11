<script setup lang='ts'>
interface Props {
  password: string
}

const props = withDefaults(defineProps<Props>(), {
  password: '',
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
  <div class="app-password">
    <div class="item">
      <BaseIcon v-if="upperLowerRegOk" name="password-hook-2" />
      <BaseIcon v-else name="password-hook-1" />
      {{ t('uppercase_lowercase_letter') }}
    </div>
    <div class="item">
      <BaseIcon v-if="lastOneNumberRegOk" name="password-hook-2" />
      <BaseIcon v-else name="password-hook-1" />
      {{ t('password_least_1_number') }}
    </div>
    <div class="item">
      <BaseIcon v-if="lengthOk" name="password-hook-2" />
      <BaseIcon v-else name="password-hook-1" />
      {{ t('least_8_characters') }}
    </div>
  </div>
</template>

<style lang='scss' scoped>
.app-password {
  display: flex;
  flex-direction: column;
  gap: var(--tg-spacing-8);
  color: var(--tg-text-lightgrey);
  font-size: var(--tg-font-size-xs);
  padding-top: var(--tg-spacing-5);
  .item {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: var(--tg-spacing-5);
    padding-left: var(--tg-spacing-3);
  }
}
</style>
