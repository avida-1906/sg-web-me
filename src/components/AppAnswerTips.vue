<script setup lang='ts'>
interface Props {
  msg: string
}
const props = withDefaults(defineProps<Props>(), {

})
// const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <div class="app-answer-tips">
    <VDropdown :distance="6">
      <slot />
      <template #popper>
        {{ props.msg }}
      </template>
    </VDropdown>
  </div>
</template>

<style lang='scss' scoped>

</style>
