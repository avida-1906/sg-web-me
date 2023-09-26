<script lang="ts" setup>
interface Props {
  tabs: {
    [text: string]: any
    value: string | number
    label: string
  }[]
}

withDefaults(defineProps<Props>(), {})

const tab = ref()
</script>

<template>
  <section class="tg-deposits-record-page">
    <div class="top">
      <BaseTab v-model="tab" :list="tabs" />
    </div>
    <div class="middle">
      <div class="empty">
        <BaseEmpty description="尚未存款" icon="empty-1" />
      </div>
      <div class="footer-buttons stack x-center y-center direction-horizontal gap-larger padding-none mt-24">
        <div>上一页</div>
        <div>下一页</div>
      </div>
      <div class="download-btn">
        <BaseButton size="md">
          下载全部存款
        </BaseButton>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.footer-buttons {
  font-size: var(--tg-font-size-default);
  color: var(--tg-text-white);
  opacity: 0.5;
}
</style>
