<script setup lang='ts'>
interface Props {
  data: {
    [t: string]: any
    title: string
    content: {
      [t: string]: string
    }
  }
}
const props = defineProps<Props>()

console.log(props.data)
</script>

<template>
  <div class="dialog-notice">
    <div
      v-if="data.pop_up_type === 1"
      class="text"
      v-html="data.content[getCurrentLanguageForBackend()]"
    />
    <BaseImage
      v-if="data.pop_up_type === 2"
      :url="data.image_url[getCurrentLanguageForBackend()]"
      is-network
    />
  </div>
</template>

<style lang='scss' scoped>
.dialog-notice {
  padding: 0 var(--tg-spacing-16) var(--tg-spacing-16);

  .title {
    font-size: var(--tg-font-size-lg);
    font-weight: var(--tg-font-weight-semibold);
    color: var(--tg-text-white);
    text-align: center;
    margin-bottom: var(--tg-spacing-16);
  }

  .text {
    font-size: var(--tg-font-size-default);
    color: var(--tg-text-lightgrey);
    line-height: 1.5;
  }
}
</style>
