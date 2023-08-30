<script setup lang="ts">
defineOptions({
  name: 'IndexPage',
})
const user = useUserStore()
const name = ref(user.savedName)

const router = useRouter()

const { t } = useI18n()
</script>

<template>
  <div style="background-color: white;">
    <h1>{{ t('button.about') }}</h1>
    <!-- <span style="background: red; display: flex; align-items: center;">
      <AppIcon name="chat" />
      Hehe
    </span> -->
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
