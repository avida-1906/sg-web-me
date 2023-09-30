<script setup lang="ts">
function handleUpdated() {
  const loading = document.querySelector('#full-loading')
  if (loading)
    loading.remove()
}
</script>

<template>
  <RouterView @vue:updated="handleUpdated" />
</template>

<style scoped lang="scss">
</style>
