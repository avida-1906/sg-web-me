<script setup lang='ts'>
const { t } = useI18n()
const route = useRoute()
const initType = route.query.type ? route.query.type.toString() : 'casino'

const currentTab = ref(initType)
const tabList = [
  { label: t('casino'), value: 'casino' },
  { label: t('sports'), value: 'sports' },
]
const sportsSlipType = ref(0)
const typeOptions = [
  { label: t('sports_active'), value: 0 },
  { label: t('sports_settled'), value: 1 },
]

const isCasino = computed(() => currentTab.value === 'casino')
const isSports = computed(() => currentTab.value === 'sports')
</script>

<template>
  <div class="my-bets">
    <div class="sports-page-title">
      <div class="left">
        <BaseIcon name="spt-user-bet" />
        <h6>{{ t('my_bets') }}</h6>
      </div>
    </div>
    <div class="tab-bar">
      <BaseTab v-model="currentTab" :list="tabList" :center="false" />
      <BaseSelect
        v-show="isSports"
        v-model="sportsSlipType"
        style="
          --tg-base-select-popper-style-padding-y:var(--tg-spacing-13);
          --tg-base-select-popper-style-padding-x:var(--tg-spacing-16)"
        :options="typeOptions" popper
      />
    </div>

    <AppSportsPageMyBet v-if="isSports" :slip-type="sportsSlipType" />

    <div class="layout-spacing">
      <AppBetData v-if="isCasino" mode="casino" />
      <AppBetData v-else-if="isSports" mode="sports" />
    </div>
  </div>
</template>

<style lang='scss' scoped>
.my-bets{
  margin-top: var(--tg-spacing-24);
  padding-top: var(--tg-spacing-12);
}
.tab-bar{
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: var(--tg-spacing-24);
}
</style>

<route lang="yaml">
meta:
  layout: home
  </route>
