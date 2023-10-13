<script lang="ts" setup>
interface Props {
  tournament: SportTournament
  autoShow?: boolean
}

defineProps<Props>()
</script>

<template>
  <BaseSecondaryAccordion :title="tournament.name" level="2" :init="autoShow">
    <template #side="{ isOpen }">
      <div v-show="!isOpen" class="accordion-badge-wrap">
        <BaseBadge :count="tournament.fixtureCount" />
      </div>
    </template>
    <div class="fixture-wrapper">
      <div class="group-time">
        2024年1月7日
      </div>
      <div
        v-for="fixture in tournament.fixtureList"
        :key="fixture.id"
        class="outright-preview"
      >
        <span class="name">
          <a class="link">
            {{ fixture.name }}
          </a>
        </span>
        <div class="breadcrumb">
          <BaseBreadcrumbs :list="['网球', 'ITF女子', 'ITF China 11A, Women Singles']" />
        </div>
        <span class="market-count">
          <a class="link">{{ fixture.marketCount }}</a>
        </span>
      </div>
    </div>
  </BaseSecondaryAccordion>
</template>

<style lang="scss" scoped>
.outright-preview {
  display: grid;
  grid-column-gap: var(--tg-spacing-8);
  padding: var(--tg-spacing-8) var(--tg-spacing-20);
  grid-template-areas:
      "name marketCount"
      "breadcrumb breadcrumb";
}
.group-time {
  display: flex;
  align-items: center;
  padding: calc(var(--tg-spacing-8) - 2px) var(--tg-spacing-16) var(--tg-spacing-8);
  position: sticky;
  top: -1px;
  z-index: 3;
  width: 100%;
  background: var(--tg-secondary-main);
  color: var(--tg-secondary-light);
  font-size: var(--tg-font-size-xs);
}
.name {
  grid-area: name;
}
.breadcrumb {
  grid-area: breadcrumb;
}
.market-count {
  grid-area: marketCount;
  margin: auto 0 auto auto;
}
</style>
