<script setup lang='ts'>
import { getCurrentLanguageForBackend } from '~/modules/i18n'

interface Props {
  data: any[]
}
defineProps<Props>()
</script>

<template>
  <BaseSwiper
    :data="data"
    mode="notice"
  >
    <template #default="{ item }">
      <BaseImage
        :url="item.image_url[getCurrentLanguageForBackend()]"
        is-network
      />
    </template>
  </BaseSwiper>
</template>

<style lang='scss' scoped>
</style>
