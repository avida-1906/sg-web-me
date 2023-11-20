<script setup lang='ts'>
const { t } = useI18n()
const route = useRoute()
const initType = route.query.type ? route.query.type.toString() : 'casino'

const currentTab = ref(initType)
const tabList = [
  { label: t('casino'), value: 'casino' },
  { label: t('sports'), value: 'sports' },
]
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
    </div>

    <AppSportsPageMyBet v-if="currentTab === 'sports'" />

    <div class="layout-spacing">
      <AppBetData v-if="currentTab === 'casino'" mode="casino" />
      <AppBetData v-else-if="currentTab === 'sports'" mode="sports" />
    </div>
  </div>
</template>

<style lang='scss' scoped>
.my-bets{
  margin-top: var(--tg-spacing-24);
  padding-top: var(--tg-spacing-12);
}
.tab-bar {
    margin-top: var(--tg-spacing-24);
    margin-bottom: var(--tg-spacing-24);
  }
</style>

<route lang="yaml">
meta:
  layout: home
  </route>
