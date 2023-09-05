<script setup lang="ts">
import { add, div, mul, sub } from '~/utils/number'

defineOptions({
  name: 'IndexPage',
})

console.log(add(0.1, 0.2), '0.3')
console.log(add(0.000000001, 0.000000002), '0.000000003')
console.log(add(111110.000000001, 10.000000002), '111120.000000003')
console.log(sub(0.1, 0.2), '-0.1')
console.log(mul(0.1, 0.2), '0.02')
console.log(div(0.1, 0.2), '0.5')

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
