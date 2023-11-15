<script lang="ts" setup>
interface Props {
  title: string
  autoShow: boolean
  count: number
}
defineProps<Props>()
const list = [{ name: '123' }]
</script>

<template>
  <BaseSecondaryAccordion :title="title" level="2" :init="autoShow">
    <template #side="{ isOpen }">
      <div v-show="!isOpen" class="accordion-badge-wrap">
        <BaseBadge :count="count" />
      </div>
    </template>
    <div class="fixture-wrapper">
      <div
        v-for="fixture in list"
        :key="fixture.name"
        class="outright-preview"
      >
        <span class="name">
          <a class="link">
            {{ fixture.name }}
          </a>
        </span>
        <div class="breadcrumb">
          <BaseBreadcrumbs
            :list="[
              { label: '网球', value: 'tennis' },
              { label: 'ITF女子', value: 'itf-women' },
              { label: 'ITF China 11A, Women Singles', value: 'itf-china-women-singles' },
            ]"
          />
        </div>
        <span class="market-count">
          <a class="link">+20</a>
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
  font-size: var(--tg-font-size-default);
  font-weight: var(--tg-font-weight-semibold);
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
  color: #fff;
}
.breadcrumb {
  grid-area: breadcrumb;
}
.market-count {
  grid-area: marketCount;
  margin: auto 0 auto auto;
  color: var(--tg-secondary-light);
}
</style>
