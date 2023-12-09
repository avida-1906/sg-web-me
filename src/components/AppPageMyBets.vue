<script setup lang='ts'>
const { t } = useI18n()
const route = useRoute()
const { bool: isFirst, setFalse: isFirstFalse } = useBoolean(true)
const initType = route.query.type ? route.query.type.toString() : 'casino'

const currentTab = ref(initType)
const tabList = [
  { label: t('casino'), value: 'casino' },
  { label: t('sports'), value: 'sports' },
]
const {
  settle,
  settleList,
} = useSportSelectSettle()

const isCasino = computed(() => currentTab.value === 'casino')
const isSports = computed(() => currentTab.value === 'sports')
</script>

<template>
  <div class="my-bets">
    <div class="sports-page-title" style="min-height: auto">
      <div class="left">
        <BaseIcon name="spt-user-bet" />
        <h6>{{ t('my_bets') }}</h6>
      </div>
    </div>
    <div class="tab-bar">
      <BaseTab
        v-model="currentTab" :list="tabList" :center="false"
        @change="isFirstFalse()"
      />
      <BaseSelect
        v-show="isSports"
        v-model="settle"
        style="
          --tg-base-select-popper-style-padding-y:var(--tg-spacing-13);
          --tg-base-select-popper-style-padding-x:var(--tg-spacing-16)"
        :options="settleList" popper
        @select="isFirstFalse()"
      />
    </div>

    <AppCasinoPageMyBet v-if="isCasino" :is-first="isFirst" />
    <AppSportsPageMyBet
      v-else-if="isSports" :key="settle" :is-first="isFirst"
      :settle="settle"
    />

    <div class="layout-spacing">
      <AppBetData v-if="initType === 'casino'" mode="casino" :is-casino-mine="false" />
      <AppBetData v-else-if="initType === 'sports'" mode="sports" />
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
