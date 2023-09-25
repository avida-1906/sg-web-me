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
    <div>{{ upperLowerReg.test(props.password) }}  含有大写和小写字母</div>
    <div>{{ lastOneNumberReg.test(props.password) }}  含有至少 1 个数字</div>
    <div>{{ props.password.length >= 8 }}  至少 8 个字符</div>
  </div>
</template>

<style lang='scss' scoped>
.app-password {
  display: flex;
  flex-direction: column;
  gap: var(--tg-spacing-8);
  color: var(--tg-text-lightgrey);
  font-size: var(--tg-font-size-xs);
}
</style>
