<script setup lang='ts'>
interface Props {
  onPage?: boolean
  settle?: number
}
const props = defineProps<Props>()

const { t } = useI18n()
const { appContentWidth } = storeToRefs(useWindowStore())

const {
  settle,
  settleList,
} = useSportSelectSettle(props.settle)

const {
  sportBetList,
  loading,
  total,
  page,
  page_size,
  next,
  prev,
} = useApiSportBetList(settle)

const columnCount = computed(() => {
  if (appContentWidth.value > 1000)
    return 3
  else if (appContentWidth.value > 650)
    return 2
  return 1
})

const paginationData = computed(() => {
  return {
    pageSize: page_size.value,
    page: page.value,
    total: total.value,
  }
})

function pagePrev() {
  scrollToTop()
  prev()
}

function pageNext() {
  scrollToTop()
  next()
}
</script>

<template>
  <div class="sports-my-bets">
    <div v-if="onPage" class="sports-page-title title">
      <div class="left">
        <BaseIcon name="spt-user-bet" />
        <h6>{{ t('my_bets') }}</h6>
      </div>
      <div class="right">
        <BaseSelect
          v-model="settle"
          style="
            --tg-base-select-popper-style-padding-y: var(--tg-spacing-13);
            --tg-base-select-popper-style-padding-x: var(--tg-spacing-16)"
          :options="settleList"
          popper
        />
      </div>
    </div>
    <AppSportsLoadingEmpty
      :loading="loading" :list="sportBetList" :settle="settle"
    />
    <div
      v-if="!loading && sportBetList.length > 0"
      class="slip-wrapper" :style="`column-count:${columnCount}`"
    >
      <div v-for="item in sportBetList" :key="item.ono" class="child">
        <AppSportsMyBetSlip :data="item" />
      </div>
    </div>
    <AppStack
      v-if="!loading && sportBetList.length > 0"
      class="stack-padding"
      :pagination-data="paginationData"
      scroll
      @previous="pagePrev" @next="pageNext"
    />
  </div>
</template>

<style lang='scss' scoped>
.title{
  margin-bottom: var(--tg-spacing-24);
}
.slip-wrapper {
  width: 100%;
  column-count: var(--column-count);
  column-gap: 16px;
  margin: var(--tg-spacing-24) 0;

  .child {
    margin-bottom: 3px;
    break-inside: avoid;
    width: 100%;
  }
}
.stack-padding {
  padding-bottom: 30px;
}
</style>
