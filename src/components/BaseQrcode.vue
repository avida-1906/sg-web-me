<script setup lang='ts'>
import QrcodeVue from 'qrcode.vue'

interface Props {
  url: string
  size?: number
}
withDefaults(defineProps<Props>(), {
  size: 128,
})

const { t } = useI18n()
const qrCodeOuter = ref()

function downloadClick() {
  const canvas = qrCodeOuter.value.querySelector('canvas')
  const url = canvas.toDataURL('image/png')
  const downloadLink = document.createElement('a')
  downloadLink.setAttribute('href', url)
  downloadLink.setAttribute('download', `${t('qr_code')}.png`)
  downloadLink.click()
}

defineExpose({ downloadClick })
</script>

<template>
  <div ref="qrCodeOuter" class="base-qrcode">
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
