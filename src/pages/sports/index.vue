<script setup lang='ts'>
defineOptions({
  name: 'KeepAliveSports',
})

const time = new Date().getTime()
</script>

<template>
  <div class="sports-home">
    home
    {{ time }}
  </div>
</template>

<style lang='scss' scoped>
.sports-home {
}
</style>

<route lang="yaml">
meta:
  layout: sports-home
</route>
