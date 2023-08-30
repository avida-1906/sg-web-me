<script setup lang="ts">
defineOptions({
  name: 'IndexPage',
})

const { t } = useI18n()
</script>

<template>
  <div style="background-color: white;">
    <h1>{{ t('button.about') }}</h1>
    <div class="sss">
      哈喽
    </div>
  </div>
</template>

<style lang="scss" scoped>
@function scalePixelValue($value, $idealViewportWidth: 1600, $min: 770px, $max: 1200px) {
    @return calc( #{$value} * (clamp(#{$min}, 100vw, #{$max}) / #{$idealViewportWidth}) )
}

.sss {
  display: inline-block;
  padding: scalePixelValue(40) scalePixelValue(20);
  background: red;
}
</style>

<route lang="yaml">
meta:
  layout: home
</route>
