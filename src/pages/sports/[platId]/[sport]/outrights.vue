<script setup lang='ts'>
const route = useRoute()
const sport = route.params.sport ? +route.params.sport : 0

const { data } = useRequest(() =>
  ApiSportOutrightList({ si: sport, page: 1, page_size: 100 }), {
  manual: false,
})
const list = computed(() => {
  return data.value ? sportsOutrightsGroupByRegion(data.value.list) : []
})
</script>

<template>
  <div class="sub-wrapper">
    <div class="sports-page-title">
      <div class="sports-page-title">
        <div class="left">
          <BaseIcon name="spt-sort-az" />
          <span>按字母顺序排列</span>
        </div>
      </div>
    </div>
    <BaseSecondaryAccordion
      v-for="region, i in list" :key="region.pgid"
      :title="region.pgn"
      level="1"
      :init="i === 0"
      icon="spt-game-intl"
    >
      <template #side="{ isOpen }">
        <div v-show="!isOpen" class="accordion-badge-wrap">
          <BaseBadge :count="region.list.length" />
        </div>
      </template>
      <div class="content is-open">
        <div class="acc-box">
          <AppOutrightPreview
            v-for="league, ii in region.list" :key="league.ci"
            :auto-show="ii === 0" :data="league"
          />
        </div>
      </div>
    </BaseSecondaryAccordion>
  </div>
</template>

<style lang='scss' scoped>
.sub-wrapper{
  display: flex;
  flex-direction: column;
  width: 100%;
  gap:  var(--tg-spacing-12);
}
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
