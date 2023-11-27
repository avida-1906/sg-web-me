<script lang="ts" setup>
const { t } = useI18n()
const { closeRightSidebar } = useRightSidebar()
const { isMobile } = storeToRefs(useWindowStore())

const { selected: headSelectValue, list: headSelectData } = useSelect([
  {
    label: t('my_bets'),
    value: 'casino-mine',
  }, {
    label: t('all_bets'),
    value: 'casino-all',
  }, {
    label: t('billboard'),
    value: 'casino-fy',
  }, {
    label: t('competition'),
    value: 'ranking-list',
  },
])

headSelectValue.value = 'casino-fy'

watch(() => isMobile.value, (newValue) => {
  if (!newValue)
    closeRightSidebar()
})
</script>

<template>
  <div class="app-notice">
    <div class="notice-head">
      <BaseSelect
        v-model="headSelectValue"
        style="--tg-base-select-hover-bg-color:var(--tg-secondary-dark);
          --tg-base-select-popper-style-padding-x:0;"
        :options="headSelectData" no-hover popper
      >
        <template #label="{ data }">
          <div class="center" style="gap: var(--tg-spacing-8);">
            <BaseIcon name="tabbar-bet" />
            <span>{{ data?.label }}</span>
          </div>
        </template>
      </BaseSelect>
      <VTooltip placement="bottom">
        <div class="item hoverable">
          <BaseButton type="text" @click="closeRightSidebar">
            <BaseIcon name="uni-close" />
          </BaseButton>
        </div>
        <template #popper>
          <div class="tiny-menu-item-title">
            {{ t('chat_close_side') }}
          </div>
        </template>
      </VTooltip>
    </div>
    <div class="notice-content">
      <AppBetData mode="casino" :tab-val="headSelectValue" :show-tab="false" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.app-notice {
    height: 100%;
    display: flex;
    flex-direction: column;
    white-space: nowrap;
    .notice-head {
      height: var(--tg-header-height);
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: var(--tg-secondary-dark);
      position: relative;
      box-shadow: var(--tg-header-shadow);
      flex-shrink: 0;
      touch-action: none;
      padding-right: var(--tg-scrollbar-size);
      padding-left: var(--tg-spacing-16);
      .hoverable {
        padding: var(--tg-spacing-1) var(--tg-spacing-4);
        border-radius: 50%;
        transition: var(--tg-transition);
        background-color: transparent;
        &:hover {
            background-color: var(--tg-secondary-deepdark);
            --tg-icon-color: var(--tg-text-white);
        }
      }
    }
    .notice-content {
        --tg-table-even-background: var(--tg-secondary-grey);
        --tg-table-odd-background: var(--tg-secondary-dark);
        width: 100%;
        display: flex;
        flex: 1;
        flex-direction: column;
        overflow: hidden;
        background: var(--tg-secondary-dark);
        padding: var(--tg-spacing-4) var(--tg-spacing-12);
    }
}
</style>
