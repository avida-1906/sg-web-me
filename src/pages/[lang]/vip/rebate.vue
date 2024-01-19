<script lang="ts" setup>
const { t } = useI18n()
// const appStore = useAppStore()
// const { vipConfigData } = storeToRefs(appStore)
const { providerList } = storeToRefs(useSportsStore())
// const { AllLanguages, userLanguage } = storeToRefs(useLanguageStore())
const { bigPlats: platformList } = storeToRefs(useCasinoStore())
const { isMobile } = storeToRefs(useWindowStore())
const { run: runVipRebateConfig, data: vipRebateConfig, loading: loadVipRebateConfig } = useRequest(ApiMemberVipRebateConfig)

const tab = ref('')

// const prefix = computed(() =>
//   AllLanguages.value.filter(a => a.value === userLanguage.value)[0].prefix)
const allPlatforms = computed(() =>
  platformList.value.sort((a, b) => b.seq - a.seq).concat(providerList.value.sort((a, b) => b.seq - a.seq)))
const tabList = computed(() => [
  { label: t('slot'), value: '3', icon: 'chess-slot-machine' },
  { label: t('fishing'), value: '2', icon: 'uni-fishing' },
  // { label: t('chess'), value: 'qp', icon: 'tabbar-game' },
  { label: t('live'), value: '1', icon: 'chess-live-casino' },
  { label: t('sports'), value: '4', icon: 'spt-soccer' },
])
// .filter(item => allPlatforms.value.filter(p => p.game_type === item.value).length))
const filteredPlatforms = computed(() =>
  allPlatforms.value.filter(p => p.game_type === tab.value))
console.log(allPlatforms.value)
const filterPlatformColumn = computed<Column[]>(() => filteredPlatforms.value.map(p =>
  ({ title: p.name, dataIndex: `${p.id}rate`, align: 'center' })))
// const data = computed(() => {
//   return vipConfigData.value
//     ? Object.values(vipConfigData.value).sort((a, b) => +a.level - +b.level)
//       .map((p) => {
//         const temp = p.rebate_config.filter(r => r.game_type === tab.value)[0]?.data.filter(t => t.currency_id === squareVal.value)
//         return temp && temp.length
//           ? temp.map(d => ({ level: p.level, [`${d.id}rate`]: d.rate === '' || d.rate === undefined || d.rate === null ? '' : `${d.rate}%` })).reduce((acc, cur) => ({ ...acc, ...cur }), {})
//           : { level: p.level }
//       })
//     : []
// })
const columns = computed<Column[]>(() => filterPlatformColumn.value.toReversed().concat({
  title: `VIP${t('grade')}`,
  dataIndex: 'vip',
  align: 'center',
  slot: 'level',
  skeWidth: '32px',
}).toReversed())
const getRebateConfig = computed(() => {
  const result = []
  const currentArr = vipRebateConfig.value ?? []
  while (currentArr.length > 0) {
    const obj: {
      [t: string]: string
    } = {}
    obj.vip = currentArr[0]?.vip
    currentArr.splice(0, columns.value.length - 1)?.forEach((item) => {
      obj[`${item.id}rate`] = item.rate ? `${item.rate}%` : '-'
    })
    result.push(obj)
  }
  return result
})

watch(tabList, (val) => {
  if (val && val.length)
    tab.value = val[0].value
}, {
  immediate: true,
})
watch(() => tab.value, () => {
  runVipRebateConfig({
    game_type: tab.value,
    cur: '',
  })
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
        </div>
      </template>
      <template v-else>
        <BaseTab
          v-model="tab"
          style="--tg-tab-style-color: var(--tg-text-lightgrey);"
          :list="tabList"
          :center="false"
        />
      </template>
      <BaseTable
        :columns="columns"
        :data-source="getRebateConfig" :loading="loadVipRebateConfig"
        :skeleton-width="20"
      >
        <template #level="{ record }">
          <div class="vip-badge">
            <BaseIcon :name="`vip${record.vip}`" />
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
  width: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: var(--tg-spacing-14);
  --tg-tab-style-wrap-bg-color: var(--tg-secondary-deepdark);
  --tg-app-amount-font-size: var(--tg-font-size-xs);
  --tg-base-square-tab-bg: var(--tg-secondary-deepdark);
  --tg-base-square-tab-margin: 0;
  --tg-base-button-justify-content: space-around;
  --tg-app-dropdown-width: 100%;
  --tg-base-square-tab-dot-width: 14px;
  --tg-base-square-tab-padding-top: var(--tg-spacing-10);
  --tg-base-square-tab-padding-y: var(--tg-spacing-6);
  --tg-base-square-tab-font-weight: 500;
  .tabs {
    padding: var(--tg-spacing-12);
    background: var(--tg-secondary-dark);
    border-radius: var(--tg-radius-default);
    display: flex;
    flex-direction: column;
    gap: var(--tg-spacing-16);
    .grid-box{
      display: grid;
      grid-template-columns: auto;
      gap:  var(--tg-spacing-12);
      align-items: center;
      --tg-app-select-currency-padding-x: 0;
      --tg-app-select-currency-padding-y: 18px;
    }
    .flex-column{
      display: flex;
      flex-direction: column;
      gap: var(--tg-spacing-4);
      color: var(--tg-secondary-light);
      >span{
        font-size: var(--tg-font-size-default);
        line-height: 1.4;
      }
    }
  }
}
.is-mobile {
  --tg-tab-style-wrap-bg-color: var(--tg-secondary-dark);
  --tg-base-square-tab-bg: var(--tg-secondary-dark);
  .tabs {
    position: relative;
    padding: 0;
    background: none;
    gap: 0;
  }
}
</style>

<route lang="yaml">
meta:
  layout: home
</route>
