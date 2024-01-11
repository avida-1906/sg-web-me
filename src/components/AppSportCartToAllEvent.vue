<script setup lang="ts">
const emits = defineEmits(['receive'])
// 购物车 向 体育所有列表，详情 推送消息
function handle() {
  emits('receive')
}
function send() {
  cartToSportsBus.emit()
}

defineExpose({ send })

onMounted(() => {
  sportsToCartBus.on(handle)
})

onUnmounted(() => {
  sportsToCartBus.off(handle)
})
</script>

<template>
  <div class="h-0 overflow-hidden text-white" />
</template>
