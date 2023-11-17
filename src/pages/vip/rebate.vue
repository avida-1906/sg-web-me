<script lang="ts" setup>
const { t } = useI18n()

const appStore = useAppStore()
const { vipConfigData } = storeToRefs(appStore)
const { platformList } = storeToRefs(useCasinoStore())
const { providerList } = storeToRefs(useSportsStore())

const tab = ref('')

const allPlatforms = computed(() => platformList.value.concat(providerList.value))
const tabList = computed(() => [
  { label: '电子', value: '3' },
  { label: '捕鱼', value: 'by' },
  { label: '棋牌', value: 'qp' },
  { label: '真人', value: '1' },
  { label: '体育', value: '4' },
].filter(item =>
  allPlatforms.value.filter(p => p.game_type === item.value).length))
const filteredPlatforms = computed(() =>
  allPlatforms.value.filter(p => p.game_type === tab.value))
const filterPlatformColumn = computed<Column[]>(() => filteredPlatforms.value.map(p =>
  ({ title: p.name, dataIndex: `${p.id}rate`, align: 'center', slot: `${p.id}rate` })))

const data = computed(() =>
  vipConfigData.value
    ? Object.values(vipConfigData.value).sort((a, b) => +a.level - +b.level)
      .map((p) => {
        const temp = p.rebate_config.filter(r => r.game_type === tab.value)[0]
        return temp
          ? temp.data.map(d => ({ level: p.level, [`${d.id}rate`]: d.rate })).reduce((acc, cur) => ({ ...acc, ...cur }), {})
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
})
</script>

<template>
  <div class="vip-rebate">
    <BaseTab
      v-model="tab"
      style="--tg-tab-style-color: var(--tg-text-lightgrey);"
      :list="tabList"
      line-style
      :center="false"
    />
    <BaseTable :columns="columns" :data-source="data">
      <template #level="{ record }">
        <div>VIP{{ record.level }}</div>
      </template>
    </BaseTable>
    <AppVipRuleDesc />
  </div>
</template>

<style lang="scss" scoped>
.vip-rebate {
  display: flex;
  flex-direction: column;
  gap: var(--tg-spacing-14);
  --tg-table-even-background: var(--tg-primary-main);
}
</style>

<route lang="yaml">
meta:
  layout: home
</route>
