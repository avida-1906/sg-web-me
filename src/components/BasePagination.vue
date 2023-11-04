<script lang="ts" setup>
interface Props {
  /** 当前页码 */
  currentPage: number
  /** 总页数 */
  total: number
  /** 页码按钮个数 */
  pagerCount?: number
  /** 每页显示个数选项数组 */
  pageSizes?: Array<number>
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  pagerCount: 7,
  pageSizes: () => [10, 20, 30, 40, 50, 100],
  disabled: false,
})

const emit = defineEmits(['update:currentPage', 'change'])

const { appContentWidth } = storeToRefs(useWindowStore())

const {
  bool: showPrevMore,
  setFalse: setShowPrevMoreFalse,
  setTrue: setShowPrevMoreTrue,
} = useBoolean(false)
const {
  bool: showNextMore,
  setFalse: setShowNextMoreFalse,
  setTrue: setShowNextMoreTrue,
} = useBoolean(false)

/** 每页多少条数据 */
const pageSize = ref(props.pageSizes[0])
const jumpPage = ref(props.currentPage)

/** 总共多少页 */
const pageCount = computed(() => Math.ceil(props.total / pageSize.value))
const pagers = computed(() => {
  const halfPagerCount = (props.pagerCount - 1) / 2
  let showPrevMore = false
  let showNextMore = false
  if (pageCount.value > props.pagerCount) {
    if (props.currentPage > props.pagerCount - halfPagerCount)
      showPrevMore = true

    if (props.currentPage < pageCount.value - halfPagerCount)
      showNextMore = true
  }
  const array: number[] = []
  if (showPrevMore && !showNextMore) {
    const startPage = pageCount.value - (props.pagerCount - 2)
    for (let i = startPage; i < pageCount.value; i++)
      array.push(i)
  }
  else if (!showPrevMore && showNextMore) {
    for (let i = 2; i < props.pagerCount; i++)
      array.push(i)
  }
  else if (showPrevMore && showNextMore) {
    const offset = Math.floor(props.pagerCount / 2) - 1
    for (let i = props.currentPage - offset; i <= props.currentPage + offset; i++)
      array.push(i)
  }
  else {
    for (let i = 2; i < pageCount.value; i++)
      array.push(i)
  }
  return array
})
const prevMoreKls = computed(() => [
  'item',
  'more',
  'btn-quickprev',
])
const nextMoreKls = computed(() => [
  'item',
  'more',
  'btn-quicknext',
])

function onPagerClick(event: UIEvent) {
  const target = event.target as HTMLElement
  if (target.tagName.toLowerCase() === 'ul' || props.disabled)
    return

  let newPage = Number(target.textContent)
  const pagerCountOffset = props.pagerCount - 2
  if (target.className.includes('more')) {
    if (target.className.includes('quickprev'))
      newPage = props.currentPage - pagerCountOffset

    else if (target.className.includes('quicknext'))
      newPage = props.currentPage + pagerCountOffset
  }
  if (!Number.isNaN(+newPage)) {
    if (newPage < 1)
      newPage = 1

    if (newPage > pageCount.value!)
      newPage = pageCount.value!
  }
  if (newPage !== props.currentPage)
    emit('update:currentPage', newPage)
}

function prevPage() {
  if (props.disabled || props.currentPage <= 1)
    return
  emit('update:currentPage', props.currentPage - 1)
}

function nextPage() {
  if (props.disabled || props.currentPage >= pageCount.value)
    return
  emit('update:currentPage', props.currentPage + 1)
}

function enterToPage() {
  const page = Math.trunc(jumpPage.value)
  if (props.disabled || page < 1 || page > pageCount.value)
    return
  emit('update:currentPage', page)
}

watchEffect(() => {
  const halfPagerCount = (props.pagerCount - 1) / 2
  setShowPrevMoreFalse()
  setShowNextMoreFalse()
  if (pageCount.value! > props.pagerCount) {
    if (props.currentPage > props.pagerCount - halfPagerCount)
      setShowPrevMoreTrue()

    if (props.currentPage < pageCount.value! - halfPagerCount)
      setShowNextMoreTrue()
  }
})
</script>

<template>
  <div class="base-pagination">
    <div class="pager-outer">
      <div
        class="btn-prev"
        :class="{ disabled: currentPage <= 1 }"
        @click="prevPage"
      >
        上一页
      </div>
      <ul v-if="appContentWidth > 800" class="pager-wrap" @click="onPagerClick">
        <li
          v-if="pageCount > 1"
          class="number item"
          :class="{ active: currentPage === 1 }"
        >
          1
        </li>
        <li
          v-if="showPrevMore"
          :class="prevMoreKls"
        >
          <BaseIcon name="uni-more-filled" />
        </li>
        <li
          v-for="pager in pagers"
          :key="pager"
          class="number item"
          :class="{ active: currentPage === pager }"
        >
          {{ pager }}
        </li>
        <li
          v-if="showNextMore"
          :class="nextMoreKls"
        >
          <BaseIcon name="uni-more-filled" />
        </li>
        <li
          v-if="pageCount > 1"
          class="number item"
          :class="{ active: currentPage === pageCount }"
        >
          {{ pageCount }}
        </li>
      </ul>
      <div v-else class="pager-bar">
        {{ currentPage }}页/{{ pageCount }}页
      </div>
      <div
        class="btn-next"
        :class="{ disabled: currentPage >= pageCount }"
        @click="nextPage"
      >
        下一页
      </div>
    </div>
    <div v-if="appContentWidth > 800" class="pager-sizes">
      <BaseSelect
        v-model="pageSize"
        :options="pageSizes.map(i => ({ value: i, label: `${i}条/页` }))"
      />
    </div>
    <div class="pager-jumper">
      <span>跳至</span>
      <div class="mid">
        <BaseInput
          v-model="jumpPage"
          type="number"
          :max="pageCount"
          min="1"
          text-center
          @down-enter="enterToPage"
        />
      </div>
      <span>页</span>
    </div>
  </div>
</template>

<style>
:root {
  --tg-base-pagination-color-default: var(--tg-secondary-light);
  --tg-base-pagination-color-active: var(--tg-text-blue);
}
</style>

<style lang="scss" scoped>
.base-pagination {
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  justify-content: center;
  white-space: nowrap;
  gap: 20px;
  color: var(--tg-base-pagination-color-default);
  font-size: var(--tg-font-size-default);
  .pager-outer {
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
    justify-content: center;
    gap: 20px;
    .btn-prev, .btn-next {
      color: var(--tg-text-white);
      font-size: var(--tg-font-size-xs);
      font-weight: 600;
      cursor: pointer;
      &.disabled {
        color: var(--tg-base-pagination-color-default);
        cursor: not-allowed;
      }
    }
    .pager-wrap {
      display: flex;
      align-items: center;
      flex-wrap: nowrap;
      justify-content: center;
      gap: 8px;
      .item {
        cursor: pointer;
        min-width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        padding-left: 4px;
        padding-right: 4px;
      }
      .number {
        border-radius: 2px;
        border: 1px solid var(--tg-base-pagination-color-default);
        &.active {
          color: var(--tg-base-pagination-color-active);
          border-color: var(--tg-base-pagination-color-active);
        }
      }
    }
  }
  .pager-sizes {
    --tg-base-select-style-padding-y: 2px;
    --tg-base-select-style-font-size: var(--tg-font-size-xs);
    width: 100px;
  }
  .pager-jumper {
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
    justify-content: center;
    gap: 8px;
    .mid {
      --tg-spacing-input-padding-vertical: 1px;
      --tg-spacing-input-padding-horizontal: 2px;
      width: 50px;
    }
  }
  .pager-bar {
    min-width: 74px;
    line-height: 22px;
    border-radius: 2px;
    border: 2px solid var(--tg-secondary-main);
    background: var(--tg-secondary-dark);;
    text-align: center;
    font-size: var(--tg-font-size-xs);
    color: var(--tg-text-white);
  }
}
</style>
