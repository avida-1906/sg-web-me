<script lang="ts" setup>
const data = ref([
  { label: 'Pragmatic Play', value: 'pp', count: 12 },
  { label: '3 Oaks Gaming', value: '3og', count: 7 },
])

const checkedValues = ref([])
</script>

<template>
  <VDropdown placement="bottom">
    <slot>
      <button class="tips">
        pop check
      </button>
    </slot>
    <template #popper>
      <div>
        <section class="base-check-pop-inner">
          <BaseCheckboxGroup v-model="checkedValues" :list="data" size="mid">
            <template #default="{ item }">
              <div class="check-item-label" :class="{ active: item.isChecked }">
                <div>{{ item.label }}</div>
                <div class="">
                  <BaseBadge :count="item.count" :mode="checkedValues.length ? (item.isChecked ? 'active' : 'black') : 'active'" />
                </div>
              </div>
            </template>
          </BaseCheckboxGroup>
        </section>
        <div class="clear-all">
          全部清除
        </div>
      </div>
    </template>
  </VDropdown>
</template>

<style lang="scss" scoped>
.clear-all {
  border-top: 1px solid var(--tg-border-color-grey);
  width: 100%;
  padding: var(--tg-spacing-button-padding-horizontal-xs) var(--tg-spacing-button-padding-vertical-xs);
  font-weight: var(--tg-font-weight-semibold);
  text-align: center;
  font-size: var(--tg-font-size-default);
  color: var(--tg-secondary-main);
}
.base-check-pop-inner {
  padding: var(--tg-spacing-button-padding-horizontal-xs);
  display: flex;
  flex-direction: column;
}
.check-item-label {
  display: inline-flex;
  align-items: center;
  font-weight: var(--tg-font-weight-semibold);
  font-size: var(--tg-font-size-default);
  color: var(--tg-secondary-grey);
  transition: all 0.2s;
  letter-spacing: 0;
  padding-top: 6px;
  padding-bottom: 4px;
  justify-content: space-between;
  gap: 8px;
}
</style>
