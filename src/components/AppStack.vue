<script setup lang='ts'>
interface Props {
  paginationData: {
    pageSize: number // 每页大小
    page: number // 当前页
    total: number // 总数
  }
  scroll?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  paginationData() {
    return {
      pageSize: 10,
      page: 1,
      total: 0,
    }
  },
})
const emit = defineEmits(['previous', 'next'])

const maxPage = computed(() => {
  return Math.ceil(props.paginationData.total / props.paginationData.pageSize)
})

const toPrevious = function () {
  if (props.paginationData.total === 0 || props.paginationData.page === 1)
    return
  emit('previous')
  if (props.scroll)
    scrollMainContentToTop()
}
const toNext = function () {
  if (props.paginationData.total === 0 || props.paginationData.page === maxPage.value)
    return
  emit('next')
  if (props.scroll)
    scrollMainContentToTop()
}
</script>

<template>
  <div class="app-pagination">
    <span
      class="pagination-previous"
      :class="{
        'no-data': props.paginationData.total === 0
          || props.paginationData.page === 1,
      }"
      @click="toPrevious"
    >
      {{ $t('page_prev') }}
    </span>
    <span
      class="pagination-next"
      :class="{
        'no-data': props.paginationData.total === 0
          || props.paginationData.page === maxPage,
      }"
      @click="toNext"
    >
      {{ $t('page_next') }}
    </span>
  </div>
</template>

<style lang='scss' scoped>
.app-pagination{
  display: flex;
  justify-content: center;
  align-items: center;
  gap: var(--tg-spacing-25);
  font-size: var(--tg-font-size-default);
  > span {
    font-weight: var(--tg-font-weight-semibold);
    cursor: pointer;
    color: var(--tg-text-white);
    user-select: none;
    &:active{
      transform: scale(.96);
    }
    &.no-data{
      cursor: not-allowed;
      color: var(--tg-text-lightgrey);
    }
  }
}
</style>
