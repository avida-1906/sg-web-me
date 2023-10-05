<script setup lang="ts">
function handleUpdated() {
  const loading = document.querySelector('#full-loading')
  if (loading) {
    setTimeout(() => {
      loading.remove()
    }, 400)
  }
}
</script>

<template>
  <RouterView @vue:updated="handleUpdated" />
</template>

<style scoped lang="scss">
</style>
