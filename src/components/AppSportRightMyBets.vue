<script lang="ts" setup>
const { t } = useI18n()
const router = useRouter()

const { selected: myBetSelectValue, list: myBetData } = useSelect([
  {
    label: t('sports_active'),
    value: EnumsBetSlipMyBetsTabStatus.active,
    icon: 'navbar-active',
  },
  {
    label: t('sports_settled'),
    value: EnumsBetSlipMyBetsTabStatus.settled,
    icon: 'navbar-settled',
  },
])
</script>

<template>
  <div class="app-sport-right-my-bets">
    <div class="tabs">
      <BaseTab v-model="myBetSelectValue" :list="myBetData" />
    </div>
    <div class="my-bet-center">
      <div class="scroll-y scrollable center-content">
        <p v-for="item in 200" :key="item">
          1
        </p>
      </div>
    </div>
    <footer class="footer">
      <!-- 我的投注 -->
      <BaseButton
        size="md"
        @click="router.push(`/sports/${getSportsPlatId()}/my-bets?type=sports`)"
      >
        {{ t('view_all') }}
      </BaseButton>
    </footer>
  </div>
</template>

<style lang="scss" scoped>
.app-sport-right-my-bets {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.tabs {
  display: grid;
  grid-auto-flow: column;
  place-items: flex-start;
  border-bottom: 2px solid var(--tg-secondary-grey);
  padding: var(--tg-spacing-8);
  gap: var(--tg-spacing-8);
  --tg-tab-style-wrap-bg-color: var(--tg-primary-main);
  --tg-tab-style-inner-padding-y: var(--tg-spacing-13);
  --tg-tab-style-inner-padding-x: var(--tg-spacing-16);
}
.footer {
  display: grid;
  padding: var(--tg-spacing-16);
  row-gap: var(--tg-spacing-12);
  background: var(--tg-secondary-grey);
  grid-template-rows: auto;
  grid-auto-flow: row;
}
.my-bet-center {
  flex-grow: 1;
  height: 0;
  .center-content {
    padding: var(--tg-spacing-8) var(--tg-spacing-16) var(--tg-spacing-16);
  }
}
</style>
