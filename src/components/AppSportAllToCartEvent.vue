<script setup lang="ts">
const emits = defineEmits(['receive'])

// // 体育所有列表，详情向 购物车 推送消息
function handle() {
  emits('receive')
}
function send() {
  sportsToCartBus.emit()
}

defineExpose({ send })

onMounted(() => {
  cartToSportsBus.on(handle)
})

onUnmounted(() => {
  cartToSportsBus.off(handle)
})
</script>

<template>
  <div class="h-0 overflow-hidden text-white" />
</template>
