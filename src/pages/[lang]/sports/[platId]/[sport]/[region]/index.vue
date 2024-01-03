<script lang="ts" setup>
const { t } = useI18n()
usePageTitle({ prefix: t('btc_sport_title') })
const { width } = storeToRefs(useWindowStore())
const sportsStore = useSportsStore()
const { sportsBetTypeList } = storeToRefs(sportsStore)
const route = useRoute()
const navObj = application.urlParamsToObject(route.fullPath.split('?')[1])
const sport = computed(() => route.params.sport ? +route.params.sport : 0)
const { bool: isStandard } = useBoolean(true)
const { bool: isFirst, setFalse: isFirstFalse } = useBoolean(true)

const baseType = ref(sportsStore.getSportsBetTypeListBySi(sport.value)[0].value)
const curTab = ref(route.query.tab ? `${route.query.tab}` : '1')

const tabs = computed(() => [
  { value: '1', label: t('sport_in_coming') },
  { value: '2', label: t('champion_bet') },
  { value: '3', label: `${t('finance_other_tab_all')} ${navObj.sn}` },
])
const baseTypeOptions = computed(() =>
  sportsStore.getSportsBetTypeListBySi(sport.value),
)
const isOver814 = computed(() => width.value > 814)
const isLiveAndUpcoming = computed(() => curTab.value === '1')
const isOutrights = computed(() => curTab.value === '2')
const isViewAll = computed(() => curTab.value === '3')
const breadcrumb = computed(() => [
  {
    path: `/sports/${SPORTS_PLAT_ID}/${sport.value}`,
    title: navObj.sn,
  },
  {
    path: '',
    title: navObj.pgn,
  },
])

watch(sportsBetTypeList, () => {
  baseType.value = sportsStore.getSportsBetTypeListBySi(sport.value)[0].value
})
</script>

<template>
  <div class="tg-sports-category-index">
    <div class="wrapper">
      <AppNavBreadCrumb :breadcrumb="breadcrumb" />
      <div class="tab-box">
        <div class="left">
          <BaseTab
            v-model="curTab" :list="tabs" size="large"
            :center="false" @change="isFirstFalse"
          />
        </div>
        <AppSportsMarketTypeSelect
          v-if="isOver814"
          v-show="isLiveAndUpcoming"
          v-model="baseType" :base-type-options="baseTypeOptions"
          :is-standard="isStandard"
        />
      </div>
      <AppSportsMarketTypeSelect
        v-if="!isOver814"
        v-show="isLiveAndUpcoming" v-model="baseType"
        :base-type-options="baseTypeOptions" :is-standard="isStandard"
      />
      <!-- 首次加载 -->
      <template v-if="isFirst">
        <AppSportsLevel2LiveUpcoming
          v-if="isLiveAndUpcoming" :base-type="baseType"
          :is-standard="isStandard"
        />
        <!-- 冠军 -->
        <AppSportsOutrights v-else-if="isOutrights" :level="2" />
        <AppSportsViewAll v-else-if="isViewAll" />
      </template>
      <!-- 后续切换tab时 -->
      <template v-else>
        <Suspense timeout="0">
          <AppSportsLevel2LiveUpcoming
            v-if="isLiveAndUpcoming" :base-type="baseType"
            :is-standard="isStandard"
          />
          <!-- 冠军 -->
          <AppSportsOutrights v-else-if="isOutrights" :level="2" />
          <AppSportsViewAll v-else-if="isViewAll" />
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
  .left{
    max-width: 100%;
  }
}
.wrapper{
  display: flex;
  flex-direction: column;
  width: 100%;
  gap:  var(--tg-spacing-24);
}
.tg-sports-category-index {
  margin-top: var(--tg-spacing-32);
  touch-action: manipulation;
}
</style>

<route lang="yaml">
meta:
  layout: home
</route>
