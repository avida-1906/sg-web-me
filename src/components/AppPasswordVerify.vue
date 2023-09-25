<script setup lang='ts'>
const props = withDefaults(defineProps<Props>(), {
  password: '',
})

const { t } = useI18n()

interface Props {
  password?: string
}
</script>

<template>
  <div class="app-password">
    <div class="item">
      <BaseIcon v-if="upperLowerReg.test(props.password)" name="password-hook-2" />
      <BaseIcon v-else name="password-hook-1" />
      {{ t('uppercase_lowercase_letter') }}
    </div>
    <div class="item">
      <BaseIcon v-if="lastOneNumberReg.test(props.password)" name="password-hook-2" />
      <BaseIcon v-else name="password-hook-1" />
      {{ t('password_least_1_number') }}
    </div>
    <div class="item">
      <BaseIcon v-if="props.password.length >= 8" name="password-hook-2" />
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
  .item {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: var(--tg-spacing-5);
  }
}
</style>
