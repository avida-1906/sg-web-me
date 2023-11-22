<script setup lang='ts'>
import { getCurrentLanguageForBackend } from '~/modules/i18n'

interface Props {
  data: any[]
}
const props = defineProps<Props>()

console.log(props.data)
</script>

<template>
  <div class="dialog-notice">
    <BaseSwiper
      :data="data"
      :width="420"
      padding0
    >
      <template v-for="item, index of data" #[`item${index}`] :key="item.id">
        <BaseImage
          :url="item.image_url[getCurrentLanguageForBackend()]"
          is-network
          width="420px"
        />
      </template>
    </BaseSwiper>
  </div>
</template>

<style lang='scss' scoped>
.dialog-notice {
  --tg-dialog-style-maxwidth: 1000px;
    // padding: 0 var(--tg-spacing-16) var(--tg-spacing-16);
}
</style>
