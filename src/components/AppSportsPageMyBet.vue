<script setup lang='ts'>
interface Props {
  onPage?: boolean
  settle?: number
  isFirst?: boolean
}
const props = defineProps<Props>()

const { t } = useI18n()
const router = useLocalRouter()
const { appContentWidth } = storeToRefs(useWindowStore())
const {
  bool: loading,
  setTrue: showLoading,
  setFalse: hideLoading,
} = useBoolean(false)
const {
  bool: isShowSkeleton,
  setTrue: showSkeleton,
  setFalse: hideSkeleton,
} = useBoolean(false)
const {
  settle,
  settleList,
} = useSportSelectSettle(props.settle)

const listLength = ref(0)

const {
  sportBetList,
  total,
  page,
  page_size,
  next,
  prev,
  fetch,
} = useApiSportBetList(settle, false, false, () => {
  // 请求完成之后
  scrollToTop()
  hideLoading()
  hideSkeleton()
  listLength.value = total.value
})

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
  showSkeleton()
  prev()
}

function pageNext() {
  scrollToTop()
  showSkeleton()
  next()
}

function goToBet() {
  router.push(`/sports/${getSportsPlatId()}`)
  setTimeout(() => {
    sportsLobbyBus.emit(true)
  }, 50)
}

function addRightSettleChange(v: any) {
  if (v === settle.value)
    fetch()
}

if (props.isFirst) {
  showLoading()
  await application.allSettled([fetch()])
}
else {
  console.log('123')
  showLoading()
  fetch()
}

onMounted(() => {
  sportsBettingToBetslipBus.on(addRightSettleChange)
})

onUnmounted(() => {
  sportsBettingToBetslipBus.off(addRightSettleChange)
})
</script>

<template>
  <div class="sports-my-bets">
    <div v-if="onPage && !loading" class="sports-page-title title">
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
    <AppLoading v-if="loading" />
    <template v-else>
      <div v-if="listLength === 0" class="empty">
        <BaseEmpty>
          <template #icon>
            <BaseIcon
              style="
                  font-size: var(--tg-empty-icon-size);
                  margin-bottom: var(--tg-spacing-25);
                "
              name="uni-empty-betslip"
            />
          </template>
          <template #description>
            <span>{{ settle === 0
              ? t('empty_unsettle_bet') : t('empty_settle_bet') }}
            </span>
          </template>
          <template #default>
            <BaseButton
              type="text"
              size="none"
              style=" --tg-base-button-text-default-color:var(--tg-text-white)"
              @click="goToBet"
            >
              {{ t('sports_betting_now') }}
            </BaseButton>
          </template>
        </BaseEmpty>
      </div>
      <div v-else class="slip-wrapper" :style="`column-count:${columnCount}`">
        <template v-if="isShowSkeleton">
          <div v-for="item in 9" :key="item" class="child">
            <AppSportsMyBetSlipSkeleton :settle="settle" />
          </div>
        </template>
        <template v-else>
          <div v-for="item in sportBetList" :key="item.ono" class="child">
            <AppSportsMyBetSlip :data="item" />
          </div>
        </template>
      </div>
      <AppStack
        class="stack-padding"
        :pagination-data="paginationData"
        scroll
        @previous="pagePrev" @next="pageNext"
      />
    </template>
  </div>
</template>

<style lang='scss' scoped>
.sports-my-bets{
  margin-bottom: 32px;
}
.title{
  margin-bottom: var(--tg-spacing-28);
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
  margin-top: var(--tg-spacing-16);
  padding-bottom:var(--tg-spacing-32);
}
.empty{
  width: 100%;
  --tg-empty-text-padding: var(--tg-spacing-12) 0 var(--tg-spacing-6);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 16px;
}
</style>
