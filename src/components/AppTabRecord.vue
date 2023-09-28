<script lang="ts" setup>
interface Props {
  tabs: {
    [text: string]: any
    value: string | number
    label: string
  }[]
  emptyText: string
  downloadText?: string
}

const props = withDefaults(defineProps<Props>(), {})

const tab = ref(props.tabs[0].value)
</script>

<template>
  <section class="tg-app-tab-record">
    <div class="top">
      <BaseTab v-model="tab" :list="tabs" :center="false" />
    </div>
    <div class="middle">
      <div class="empty">
        <BaseEmpty :description="emptyText" icon="empty-1" />
      </div>
      <div class="page-stack-wrap mt-24">
        <AppStack />
      </div>
      <div v-if="downloadText" class="download-btn mt-24">
        <BaseButton size="md">
          {{ downloadText }}
        </BaseButton>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.tg-app-tab-record {
  --tg-tab-style-wrap-bg-color: var(--tg-primary-main);
}
.footer-buttons {
  font-size: var(--tg-font-size-default);
  color: var(--tg-text-white);
  opacity: 0.5;
}
</style>
