<script lang="ts" setup>
const { t } = useI18n()

const curSort = ref('featured')

const sortData = reactive([
  { icon: 'spt-sort-az', label: 'A-Z', value: 'asc' },
  { icon: 'spt-sort-az', label: 'Z-A', value: 'desc' },
  { icon: 'chess-bonus-rounds', label: t('casino_sort_popular'), value: 'popular' },
  { icon: 'chess-slot-machine', label: t('casino_sort_featured'), value: 'featured' },
])
</script>

<template>
  <VDropdown placement="bottom">
    <slot>
      <button class="tips">
        pop sort
      </button>
    </slot>
    <template #popper>
      <div>
        <section class="tg-base-game-sort-pop">
          <ul class="sorts">
            <li v-for="item in sortData" :key="item.value" class="item" :class="{ active: curSort === item.value }">
              <BaseIcon :name="item.icon" />
              <div>{{ item.label }}</div>
            </li>
          </ul>
        </section>
      </div>
    </template>
  </VDropdown>
</template>

<style lang="scss" scoped>
.tg-base-game-sort-pop {
  color: var(--tg-secondary-main);
  font-size: var(--tg-font-size-default);
  font-weight: var(--tg-font-weight-semibold);
  --tg-icon-color: var(--tg-secondary-main);
  .sorts {
    .item {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      padding: var(--tg-spacing-button-padding-horizontal-xs) var(--tg-spacing-button-padding-vertical-xs);
      gap: var(--tg-spacing-8);
      cursor: pointer;
      &:hover {
        background: var(--tg-secondary-light);
      }
      &.active {
        color: var(--tg-text-blue);
        --tg-icon-color: var(--tg-text-blue);
      }
    }
  }
}
</style>
