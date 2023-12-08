<script lang="ts" setup>
interface Props {
  tabs: {
    [text: string]: any
    value: string | number
    label: string
  }[]
  emptyText: string
  downloadText?: string
  paginationData: {
    pageSize: number // 每页大小
    page: number // 当前页
    total: number // 总数
  }
}

const props = withDefaults(defineProps<Props>(), {})

const emit = defineEmits(['tab', 'previous', 'next'])
const tab = ref(props.tabs[0].value)

function tabChange() {
  emit('tab', tab.value)
}
function pagePrevious() {
  emit('previous')
}
function pageNext() {
  emit('next')
}
</script>

<template>
  <section class="tg-app-tab-record">
    <div class="top">
      <BaseTab v-model="tab" :list="tabs" :center="false" @change="tabChange" />
    </div>
    <div class="middle">
      <slot name="content" :tab-val="tab" />
      <div v-if="emptyText" class="empty">
        <BaseEmpty :description="emptyText" icon="empty-1" />
      </div>
      <div class="page-stack-wrap mt-24">
        <AppStack
          :pagination-data="paginationData"
          @previous="pagePrevious" @next="pageNext"
        />
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
