<script setup lang='ts'>
interface Props {
  modelValue: boolean // 是否展开
}
const props = defineProps<Props>()
const emit = defineEmits(['update:modelValue'])

function onClick() {
  emit('update:modelValue', !props.modelValue)
}

// 宽度边界 1200
const widthBoundaryXl = ref(1200)
// 宽度边界 768
const widthBoundaryMd = ref(768)
const { width } = useWindowSize()
// 左侧侧边栏宽度
const leftSidebarWidth = computed(() => {
  return `${props.modelValue ? 240 : 60}px`
})
</script>

<template>
  <div
    class="left-sidebar"
    :style="{
      '--width': leftSidebarWidth,
    }"
    :class="{
      'fixed-small': width > widthBoundaryMd,
      'fixed': width < widthBoundaryXl,
      'full-screen': width <= widthBoundaryMd,
    }"
  >
    <div>
      <button @click="onClick">
        切换
      </button>
    </div>
  </div>
</template>

<style lang='scss' scoped>

</style>
