<script setup lang='ts'>
import QrcodeVue from 'qrcode.vue'

interface Props {
  url: string
  size?: number
}
withDefaults(defineProps<Props>(), {
  size: 128,
})
</script>

<template>
  <div class="base-qrcode">
    <div class="wrap">
      <QrcodeVue :value="url" :size="size" />
    </div>
  </div>
</template>

<style lang='scss' scoped>
.base-qrcode {
  display: flex;
}

.wrap{
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--tg-spacing-8);
  border-radius: var(--tg-radius-default);
  box-shadow: var(--tg-header-shadow);
  background-color: #fff;
}
</style>
