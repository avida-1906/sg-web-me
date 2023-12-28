<script lang="ts" setup>
const { t } = useI18n()

const appStore = useAppStore()
const { vipConfigData } = storeToRefs(appStore)
const { providerList } = storeToRefs(useSportsStore())
const { AllLanguages, userLanguage } = storeToRefs(useLanguageStore())
const { bigPlats: platformList } = storeToRefs(useCasinoStore())
const { isMobile } = storeToRefs(useWindowStore())

const tab = ref('')

const prefix = computed(() =>
  AllLanguages.value.filter(a => a.value === userLanguage.value)[0].prefix)
const allPlatforms = computed(() =>
  platformList.value.sort((a, b) => b.seq - a.seq).concat(providerList.value.sort((a, b) => b.seq - a.seq)))
const tabList = computed(() => [
  { label: t('slot'), value: '3', icon: 'chess-slot-machine' },
  { label: t('fishing'), value: 'by', icon: 'spt-user-bet' },
  { label: t('chess'), value: 'qp', icon: 'tabbar-game' },
  { label: t('live'), value: '1', icon: 'chess-live-casino' },
  { label: t('sports'), value: '4', icon: 'spt-soccer' },
].filter(item =>
  allPlatforms.value.filter(p => p.game_type === item.value).length))
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
//
const columns = computed<Column[]>(() => filterPlatformColumn.value.toReversed().concat({
  title: `VIP${t('grade')}`,
  dataIndex: 'level',
  align: 'center',
  slot: 'level',
}).toReversed())

watch(tabList, (val) => {
  if (val && val.length)
    tab.value = val[0].value
}, {
  immediate: true,
})
</script>

<template>
  <div
    class="vip-rebate"
    :class="{ 'is-mobile': isMobile }" :style="{
      '--tg-table-td-padding': '12.5px',
    }"
  >
    <div class="tabs">
      <div
        class="tabs-outer"
      >
        <BaseTab
          v-model="tab"
          style="--tg-tab-style-color: var(--tg-text-lightgrey);"
          :list="tabList"
          :center="false"
        />
      </div>
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
  --tg-tab-style-wrap-bg-color: var(--tg-primary-main);
  --tg-app-amount-font-size: var(--tg-font-size-xs);
  .tabs-outer {
    background: var(--tg-secondary-dark);
  }
  &.is-mobile {
    .tabs {
      // padding: 0 12px;
      position: relative;
    }
  }
  .tabs {
    background: var(--tg-secondary-dark);
    padding: var(--tg-spacing-12);
    border-radius: var(--tg-radius-default);
    display: flex;
    flex-direction: column;
    gap: var(--tg-spacing-12);
  }
}
</style>

<route lang="yaml">
meta:
  layout: home
</route>
