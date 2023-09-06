<script setup lang="ts">
defineOptions({
  name: 'IndexPage',
})
console.log(timestampToTime(1628774400000))
const { t } = useI18n()
</script>

<template>
  <div style="background-color: white; height: 1000px">
    <div>{{ t('hello') }}</div>
  </div>
</template>

<style lang="scss" scoped>
</style>

<route lang="yaml">
meta:
  layout: home
</route>
