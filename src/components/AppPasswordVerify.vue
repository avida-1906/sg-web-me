<script setup lang='ts'>
interface Props {
  password?: string
}

const props = withDefaults(defineProps<Props>(), {
  password: '',
})
</script>

<template>
  <div class="app-password">
    <div class="item">
      <BaseIcon v-if="upperLowerReg.test(props.password)" name="password-hook-2" />
      <BaseIcon v-else name="password-hook-1" />
      含有大写和小写字母
    </div>
    <div class="item">
      <BaseIcon v-if="lastOneNumberReg.test(props.password)" name="password-hook-2" />
      <BaseIcon v-else name="password-hook-1" />
      含有至少 1 个数字
    </div>
    <div class="item">
      <BaseIcon v-if="props.password.length >= 8" name="password-hook-2" />
      <BaseIcon v-else name="password-hook-1" />
      至少 8 个字符
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
