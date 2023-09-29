<script setup lang="ts">
const { bool: isShow, setFalse: setShowFalse, setTrue: setShowTrue } = useBoolean(false)
let timer: NodeJS.Timeout | null = null

function init() {
  timer = setTimeout(() => {
    console.error('Loading timeout')
    setShowTrue()
  }, 250)
}

function clearTimer() {
  if (timer) {
    clearTimeout(timer)
    timer = null
  }
}

function handleUpdated() {
  clearTimer()
  setShowFalse()
}

init()
</script>

<template>
  <RouterView @vue:updated="handleUpdated" />
  <div v-if="isShow" class="loading center">
    <BaseLoading />
  </div>
</template>

<style scoped lang="scss">
.loading {
  width: 100vw;
  height: 100vh;
  position: fixed;
  background-color: var(--tg-primary-main);
  inset: 0;
  z-index: var(--tg-z-index-top);
}
</style>
