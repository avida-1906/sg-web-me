<script lang="ts" setup>
interface Props {
  /** 当前页码 */
  currentPage?: number
  pageSize?: number
  /** 总页数 */
  total: number
  /** 页码按钮个数 */
  pagerCount?: number
  /** 每页显示个数选项数组 */
  pageSizes?: Array<number>
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  currentPage: 1,
  pagerCount: 7,
  pageSizes: () => [10, 20, 30, 40, 50, 100],
  disabled: false,
})

const emit = defineEmits(['update:currentPage', 'change', 'update:pageSize'])

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
const page2Size = ref(props.pageSizes[0])
const jumpPage = ref(props.currentPage)

emit('update:pageSize', +page2Size.value)

/** 总共多少页 */
const pageCount = computed(() => Math.ceil(props.total / page2Size.value))
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
  if (newPage !== props.currentPage) {
    emit('update:currentPage', newPage)
    emit('change', newPage, page2Size.value)
  }
}

function prevPage() {
  if (props.disabled || props.currentPage <= 1)
    return
  emit('update:currentPage', props.currentPage - 1)
  emit('change', props.currentPage - 1, page2Size.value)
}

function nextPage() {
  if (props.disabled || props.currentPage >= pageCount.value)
    return
  emit('update:currentPage', props.currentPage + 1)
  emit('change', props.currentPage + 1, page2Size.value)
}

function enterToPage() {
  const page = Math.trunc(jumpPage.value)
  if (props.disabled || page < 1 || page > pageCount.value)
    return
  emit('update:currentPage', page)
  emit('change', page, page2Size.value)
}

function pageSizeChange() {
  emit('update:currentPage', 1)
  emit('change', 1, page2Size.value)
  jumpPage.value = 1
}

watch(page2Size, (val) => {
  emit('update:pageSize', +val)
})

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
        {{ $t('page_prev') }}
      </div>
      <ul v-if="appContentWidth > 800" class="pager-wrap" @click="onPagerClick">
        <li
          v-if="pageCount >= 1"
          class="item number"
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
        {{ currentPage }}{{ $t('page_label') }}/{{ pageCount }}{{ $t('page_label') }}
      </div>
      <div
        class="btn-next"
        :class="{ disabled: currentPage >= pageCount }"
        @click="nextPage"
      >
        {{ $t('page_next') }}
      </div>
    </div>
    <div v-if="appContentWidth > 800" class="pager-sizes">
      <BaseSelect
        v-model="page2Size"
        :options="pageSizes.map(i =>
          ({ value: i, label: `${i}${$t('page_sizer_label')}` }))"
        @change="pageSizeChange"
      />
    </div>
    <div class="pager-jumper">
      <span>{{ $t('jump_to') }}</span>
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
      <span>{{ $t('page_label') }}</span>
    </div>
  </div>
</template>

<style>
:root {
  --tg-base-pagination-color-default: var(--tg-secondary-light);
  --tg-base-pagination-color-active: var(--tg-text-blue);
  --tg-base-pagination-margin: 16px 0 0;
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
  margin: var(--tg-base-pagination-margin);
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
      --tg-base-input-style-pad-y: 1px;
      --tg-base-input-style-pad-x: 2px;
      width: 55px;
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
