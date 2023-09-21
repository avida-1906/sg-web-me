<script setup lang='ts'>
interface Props {
  paginationData: {
    pageSize: number // 每页大小
    pageNumber: number // 当前页
    total: number // 总数
  }
}
const props = withDefaults(defineProps<Props>(), {
  paginationData() {
    return {
      pageSize: 10,
      pageNumber: 1,
      total: 0,
    }
  },
})

const emit = defineEmits(['previous', 'next'])
const maxPageNumber = computed(() => {
  return Math.ceil(props.paginationData.total / props.paginationData.pageSize)
})

const toPrevious = function () {
  if (props.paginationData.total === 0 || props.paginationData.pageNumber === 1)
    return
  emit('previous')
}
const toNext = function () {
  if (props.paginationData.total === 0 || props.paginationData.pageNumber === maxPageNumber.value)
    return
  emit('next')
}
</script>

<template>
  <div class="app-pagination">
    <span class="pagination-previous" :class="{ 'no-data': props.paginationData.total === 0 || props.paginationData.pageNumber === 1 }" @click="toPrevious">
      上一页
    </span>
    <span class="pagination-next" :class="{ 'no-data': props.paginationData.total === 0 || props.paginationData.pageNumber === maxPageNumber }" @click="toNext">
      下一页
    </span>
  </div>
</template>

<style lang='scss' scoped>
.app-pagination{
  // margin-top: var(--tg-spacing-25);
  display: flex;
  justify-content: center;
  align-items: center;
  gap: var(--tg-spacing-25);
  > span {
    font-weight: var(--tg-font-weight-semibold);
    cursor: pointer;
    color: var(--tg-text-white);
    user-select: none;
    &.no-data{
      cursor: not-allowed;
      color: var(--tg-text-lightgrey);
    }
  }
}
</style>
