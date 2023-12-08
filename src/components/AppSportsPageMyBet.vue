<script setup lang='ts'>
interface Props {
  onPage?: boolean
  settle?: number
  isFirst?: boolean
}
const props = defineProps<Props>()

const { t } = useI18n()
const router = useRouter()
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
  fetch,
} = useApiSportBetList(settle, false, scrollToTop)

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

function goToBet() {
  router.push(`/sports/${getSportsPlatId()}`)
  setTimeout(() => {
    sportsLobbyBus.emit(true)
  }, 50)
}

if (props.isFirst)
  await application.allSettled([fetch()])
else
  fetch()
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
    <div v-if="loading" class="empty loading">
      <BaseLoading />
    </div>
    <template v-else>
      <div v-if="sportBetList.length === 0" class="empty">
        <BaseEmpty>
          <template #icon>
            <BaseIcon
              style="
                  font-size: var(--tg-empty-icon-size);
                  margin-bottom: var(--tg-spacing-24);
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
        <div v-for="item in sportBetList" :key="item.ono" class="child">
          <AppSportsMyBetSlip :data="item" />
        </div>
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
  margin-top: var(--tg-spacing-24);
  padding-bottom:var(--tg-spacing-30);
}
.empty{
  width: 100%;
  min-height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.loading{
  min-height: 400px;
}
</style>
