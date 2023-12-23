<script lang="ts" setup>
const { t } = useI18n()
const { closeRightSidebar } = useRightSidebar()
const { isMobile } = storeToRefs(useWindowStore())
const { isLogin } = storeToRefs(useAppStore())

const { selected: headSelectValue, list: headSelectData } = useSelect([
  {
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

const getIcon = computed(() => {
  switch (headSelectValue.value) {
    case 'casino-fy': return 'chess-vipclub'
    case 'ranking-list': return 'spt-competition'
    default: return 'tabbar-bet'
  }
})

function handleMine() {
  headSelectData.value.shift()
}

if (isLogin.value) {
  headSelectData.value.unshift({
    label: t('my_bets'),
    value: 'casino-mine',
  })
}
headSelectValue.value = 'casino-all'

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
        :distance="10"
        style="--tg-base-select-hover-bg-color:var(--tg-secondary-grey);
          --tg-base-select-popper-style-padding-x: var(--tg-spacing-16);
          --tg-base-select-popper-style-padding-y: var(--tg-spacing-13);
          --tg-base-select-popcontent-lineheight: 1;"
        :options="headSelectData" no-hover popper
        popper-clazz="casino-bet-pop"
      >
        <template #label="{ data }">
          <div class="center" style="gap: var(--tg-spacing-8);">
            <BaseIcon :name="getIcon" />
            <span>{{ data?.label }}</span>
          </div>
        </template>
      </BaseSelect>
      <VTooltip placement="bottom">
        <div class="item bet-close hoverable">
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
      <AppBetData
        mode="casino" :tab-val="headSelectValue"
        :show-tab="false" @del-mine="handleMine"
      />
    </div>
  </div>
</template>

<style>
.casino-bet-pop {
  --tg-base-select-popper-option-active-color: var(--tg-popper-color-default);
  --tg-base-select-popper-active-color: var(--tg-popper-color-default);
}
</style>

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
      padding-right: var(--tg-spacing-10);
      // padding-left: var(--tg-spacing-16);
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
        --tg-table-th-background: var(--tg-primary-main);
        --tg-table-margin-top-empty: 24.6vh;
        // --tg-table-even-background: var(--tg-secondary-grey);
        // --tg-table-odd-background: var(--tg-secondary-dark);
        width: 100%;
        display: flex;
        flex: 1;
        flex-direction: column;
        overflow: hidden;
        background: var(--tg-secondary-dark);
        padding: 0 var(--tg-spacing-4) var(--tg-spacing-12);
    }
}
</style>
