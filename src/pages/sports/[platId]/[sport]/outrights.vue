<script setup lang='ts'>
const { t } = useI18n()
const sportsStore = useSportsStore()
const route = useRoute()
const sport = route.params.sport
const sportName = computed(() => sportsStore.getSportsNameBySi(+sport))

ApiSportOutrightList({ si: +sport, page: 1, page_size: 100 })
const isOpen = true
</script>

<template>
  <!-- 热门 -->
  <div class="sports-page-title">
    <div class="left">
      <BaseIcon name="uni-popular" />
      <h6>{{ t('casino_sort_popular') }} {{ sportName }}</h6>
    </div>
  </div>
  <BaseSecondaryAccordion
    title="234"
    level="1"
    :init="true"
    icon="spt-game-intl"
  >
    <div v-show="isOpen" class="content" :class="{ 'is-open': isOpen }">
      <div class="acc-box">
        <AppOutrightPreview title="123" :auto-show="true" :count="20" />
      </div>
    </div>
  </BaseSecondaryAccordion>
</template>

<style lang='scss' scoped>
.content {
  background: var(--content-background);
  display: flex;
  flex-direction: column;
  width: 100%;
  border-radius: 0 0 var(--tg-radius-default) var(--tg-radius-default);

  &.is-open {
    border-top: 2px solid var(--content-border);
  }
}

.acc-box {
  display: grid;
  grid-auto-flow: row;
  justify-content: stretch;
  align-items: center;
  gap: var(--tg-spacing-12);
  padding: var(--tg-spacing-8);
}
</style>
