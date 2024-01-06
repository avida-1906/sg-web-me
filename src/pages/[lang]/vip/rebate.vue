<script lang="ts" setup>
const { t } = useI18n()

const appStore = useAppStore()
const { vipConfigData } = storeToRefs(appStore)
const { providerList } = storeToRefs(useSportsStore())
const { AllLanguages, userLanguage } = storeToRefs(useLanguageStore())
const { bigPlats: platformList } = storeToRefs(useCasinoStore())
const { isMobile } = storeToRefs(useWindowStore())
const {
  renderCurrencyList,
} = useCurrencyData()

const tab = ref('')
const squareTabList = renderCurrencyList.value.map((item) => {
  return {
    value: item.cur,
    label: item.type,
    icon: `/currency/${item.cur}.webp`,
    useCloudImg: true,
  }
})
const squareVal = ref(squareTabList[0].value)

const prefix = computed(() =>
  AllLanguages.value.filter(a => a.value === userLanguage.value)[0].prefix)
const allPlatforms = computed(() =>
  platformList.value.sort((a, b) => b.seq - a.seq).concat(providerList.value.sort((a, b) => b.seq - a.seq)))
const tabList = computed(() => [
  { label: t('slot'), value: '3', icon: 'chess-slot-machine' },
  { label: t('fishing'), value: 'by', icon: 'uni-fishing' },
  { label: t('chess'), value: 'qp', icon: 'tabbar-game' },
  { label: t('live'), value: '1', icon: 'chess-live-casino' },
  { label: t('sports'), value: '4', icon: 'spt-soccer' },
].filter(item => allPlatforms.value.filter(p => p.game_type === item.value).length))
const filteredPlatforms = computed(() =>
  allPlatforms.value.filter(p => p.game_type === tab.value))
const filterPlatformColumn = computed<Column[]>(() => filteredPlatforms.value.map(p =>
  ({ title: p[prefix.value ? `${prefix.value}_name` : 'name'], dataIndex: `${p.id}rate`, align: 'center', slot: `${p.id}rate` })))
const data = computed(() =>
  vipConfigData.value
    ? Object.values(vipConfigData.value).sort((a, b) => +a.level - +b.level)
      .map((p) => {
        const temp = p.rebate_config.filter(r => r.game_type === tab.value)[0]
        return temp
          ? temp.data.map(d => ({ level: p.level, [`${d.id}rate`]: d.rate === '' || d.rate === undefined || d.rate === null ? '' : `${d.rate}%` })).reduce((acc, cur) => ({ ...acc, ...cur }), {})
          : { level: p.level }
      })
    : [])
const columns = computed<Column[]>(() => filterPlatformColumn.value.toReversed().concat({
  title: `VIP${t('grade')}`,
  dataIndex: 'level',
  align: 'center',
  slot: 'level',
}).toReversed())

function changeCurrency(item: any) {
  console.log(item)
}

watch(tabList, (val) => {
  if (val && val.length)
    tab.value = val[0].value
}, {
  immediate: true,
})
</script>

<template>
  <div class="vip-rebate" :class="{ 'is-mobile': isMobile }">
    <div class="tabs">
      <template v-if="isMobile">
        <div class="grid-box">
          <div class="flex-column">
            <span>{{ $t('type_select') }}</span>
            <BaseSquareTab v-model="tab" :list="tabList" />
          </div>
          <div class="flex-column">
            <span>{{ $t('currency') }}</span>
            <div class="currency-box">
              <AppSelectCurrency
                :type="3"
                :show-balance="false"
                popper-clazz="app-wallet-cur"
                placeholder="search"
                @change="changeCurrency"
              />
            </div>
          </div>
        </div>
      </template>
      <template v-else>
        <div class="tabs-outer">
          <BaseTab
            v-model="tab"
            style="--tg-tab-style-color: var(--tg-text-lightgrey);"
            :list="tabList"
            :center="false"
          />
        </div>
        <BaseSquareTab v-model="squareVal" :list="squareTabList" />
      </template>
      <BaseTable :columns="columns" :data-source="data">
        <template #level="{ record }">
          <!-- <div>VIP{{ record.level }}</div> -->
          <div class="vip-badge">
            <BaseIcon :name="`vip${record.level}`" />
          </div>
        </template>
      </BaseTable>
    </div>
    <AppVipRuleDesc />
  </div>
</template>

<style lang="scss" scoped>
.small-text {
  font-size: var(--tg-font-size-xs);
}
.vip-badge {
  font-size: var(--tg-font-size-3xl);
  display: flex;
  align-items: center;
  justify-content: center;
}
.vip-rebate {
  display: flex;
  flex-direction: column;
  gap: var(--tg-spacing-14);
  --tg-tab-style-wrap-bg-color: var(--tg-secondary-deepdark);
  --tg-app-amount-font-size: var(--tg-font-size-xs);
  --tg-base-square-tab-bg: var(--tg-secondary-deepdark);
  --tg-base-square-tab-margin: 0;
  --tg-base-button-justify-content: space-around;
  --tg-app-dropdown-width: 100%;
  .tabs {
    padding: var(--tg-spacing-12);
    border-radius: var(--tg-radius-default);
    display: flex;
    flex-direction: column;
    gap: var(--tg-spacing-12);
    .grid-box{
      display: grid;
      grid-template-columns: 9fr 5fr;
      gap:  var(--tg-spacing-12);
      align-items: center;
      --tg-app-select-currency-padding-x: 0;
      --tg-app-select-currency-padding-y: 18px;
    }
    .flex-column{
      display: flex;
      flex-direction: column;
      // align-items: flex-start;
      gap: var(--tg-spacing-4);
      >span{
        font-size: var(--tg-font-size-default);
        line-height: 1.4;
      }
    }
    .currency-box{
      border-radius: var(--tg-radius-default);
    }
  }
}
.is-mobile {
  --tg-tab-style-wrap-bg-color: var(--tg-secondary-dark);
  --tg-base-square-tab-bg: var(--tg-secondary-dark);
  .tabs {
    position: relative;
    padding: 0;
  }
}
</style>

<route lang="yaml">
meta:
  layout: home
</route>
