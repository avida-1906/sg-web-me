<script lang="ts" setup>
const { t } = useI18n()
const route = useRoute()
const { width } = storeToRefs(useWindowStore())
const sportsStore = useSportsStore()
const { sidebarData, sportsBetTypeList } = storeToRefs(sportsStore)
const menuStore = useMenuStore()
const { bool: isStandard } = useBoolean(true)
const { bool: isFirst, setFalse: isFirstFalse } = useBoolean(true)

const curTab = ref(route.query.tab ? `${route.query.tab}` : '1')
const sport = computed(() => route.params.sport ? +route.params.sport : 0)
const baseType = ref(sportsStore.getSportsBetTypeListBySi(sport.value)[0].value)
const isOver814 = computed(() => width.value > 814)
const isLiveAndUpcoming = computed(() => curTab.value === '1')
const isOutrights = computed(() => curTab.value === '2')
const isViewAll = computed(() => curTab.value === '3')
const baseTypeOptions = computed(() =>
  sportsStore.getSportsBetTypeListBySi(sport.value),
)
// 球种名称
const sportName = computed(() => {
  if (sidebarData.value)
    return sidebarData.value.all.find(a => a.si === sport.value)?.sn ?? '-'
  return '-'
})
const breadcrumb = computed(() => [
  {
    path: '',
    title: sportName.value,
  },
])
const tabs = computed(() => [
  { value: '1', label: t('top_level_sport_item_live_upcoming_sport_in_coming') },
  { value: '2', label: t('champion_bet') },
  { value: '3', label: `${t('finance_other_tab_all')} ${sportName.value}` },
])

function onTabChange(v: string) {
  isFirstFalse()
  menuStore.setSideBigActiveMenu(`/sports/${getSportsPlatId()}/${sport.value}?tab=${v}`)
}

watch(sportsBetTypeList, () => {
  baseType.value = sportsStore.getSportsBetTypeListBySi(sport.value)[0].value
})
watch(route, (r) => {
  if (r.name === 'sports-platId-sport') {
    isFirstFalse()
    curTab.value = r.query.tab ? `${route.query.tab}` : '1'
  }
})

usePageTitle({ prefix: sportName })
</script>

<template>
  <div class="tg-sports-index tg-sports-hotlive">
    <div class="wrapper">
      <AppNavBreadCrumb :breadcrumb="breadcrumb" />
      <div class="tab-box">
        <div class="left">
          <BaseTab
            v-model="curTab" :list="tabs" size="large"
            :center="false" @change="onTabChange"
          />
        </div>
        <AppSportsMarketTypeSelect
          v-if="isOver814"
          v-show="isLiveAndUpcoming" v-model="baseType"
          :base-type-options="baseTypeOptions" :is-standard="isStandard"
        />
      </div>
      <AppSportsMarketTypeSelect
        v-if="!isOver814"
        v-show="isLiveAndUpcoming" v-model="baseType"
        :base-type-options="baseTypeOptions" :is-standard="isStandard"
      />

      <!-- 首次加载 -->
      <template v-if="isFirst">
        <!-- 滚球及即将开赛 -->
        <AppSportsLevel1LiveUpcoming
          v-if="isLiveAndUpcoming"
          :base-type="baseType" :is-standard="isStandard"
        />
        <!-- 冠军 -->
        <AppSportsLevel1Outrights v-else-if="isOutrights" />
        <AppSportsViewAll
          v-else-if="isViewAll"
          style="margin-bottom: var(--tg-spacing-24);"
        />
      </template>
      <!-- 后续切换tab时 -->
      <template v-else>
        <Suspense timeout="0">
          <AppSportsLevel1LiveUpcoming
            v-if="isLiveAndUpcoming"
            :base-type="baseType" :is-standard="isStandard"
          />
          <AppSportsLevel1Outrights v-else-if="isOutrights" />
          <AppSportsViewAll
            v-else-if="isViewAll"
            style="margin-bottom: var(--tg-spacing-24);"
          />
          <template #fallback>
            <AppLoading full-screen />
          </template>
        </Suspense>
      </template>

      <AppBetData mode="sports" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.tab-box{
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: var(--tg-spacing-24);
  margin-bottom: var(--tg-spacing-24);
  .left{
    max-width: 100%;
  }
}
.tg-sports-index {
  margin-top: var(--tg-spacing-32);
  touch-action: manipulation;
}
</style>

<route lang="yaml">
meta:
  layout: home
</route>
