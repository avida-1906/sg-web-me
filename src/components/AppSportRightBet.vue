<script lang="ts" setup>
import AppSportRightBetSlip from './AppSportRightBetSlip.vue'
import AppSportRightMyBets from './AppSportRightMyBets.vue'
import { EnumsBetSlipHeadStatus } from '~/utils/enums'

const { t } = useI18n()
const sportStore = useSportsStore()
const { closeRightSidebar } = useRightSidebar()
const { selected: headSelectValue, list: headSelectData } = useSelect([
  {
    label: t('bet_slip'),
    value: EnumsBetSlipHeadStatus.betSlip,
    icon: 'spt-user-bet',
  },
  {
    label: t('my_bets'),
    value: EnumsBetSlipHeadStatus.myBets,
    icon: 'navbar-user-bet',
  },
])

const betCount = computed(() => {
  return sportStore.cart.count
})

const renderComponent = computed(() => {
  switch (headSelectValue.value) {
    case EnumsBetSlipHeadStatus.betSlip:
      return AppSportRightBetSlip
    case EnumsBetSlipHeadStatus.myBets:
      return AppSportRightMyBets
  }
})

function changeHeadSelectValue(value: EnumsBetSlipHeadStatus) {
  headSelectValue.value = value
}
</script>

<template>
  <div class="app-sport-right-bet">
    <div class="navigation-header">
      <BaseSelect
        v-model="headSelectValue"
        style="--tg-base-select-hover-bg-color:var(--tg-secondary-dark);
          --tg-base-select-popper-style-padding-x:0;"
        :options="headSelectData" no-hover popper
      >
        <template #label="{ data }">
          <div class="type-select">
            <BaseIcon :name="data?.icon" />
            <span>{{ data?.label }}</span>
            <BaseBadge v-if="betCount" :count="betCount" mode="active" />
          </div>
        </template>
        <template #option="{ data: { item } }">
          <div class="type-option">
            <BaseIcon :name="item.icon" />
            <span>{{ item.label }}</span>
            <BaseBadge v-if="item?.num" :count="item?.num" mode="active" />
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
    <div class="content">
      <KeepAlive>
        <component
          :is="renderComponent"
          @change-head-select-value="changeHeadSelectValue"
        />
      </KeepAlive>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.app-sport-right-bet {
  display: flex;
  flex-direction: column;
  height: 100%;
  .content {
    flex: 1;
  }
}
.type-option {
  display: flex;
  align-items: center;
  gap: var(--tg-spacing-8);
}
.navigation-header {
    background: var(--tg-secondary-dark);
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: var(--tg-header-height);
    z-index: 2;
    position: relative;
    box-shadow: var(--tg-box-shadow-lg);
    touch-action: none;
    padding-right: var(--tg-scrollbar-size);
    padding-left: var(--tg-spacing-16);

    .type-select {
      display: flex;
      align-items: center;
      gap:var(--tg-spacing-8);
    }

    .hoverable {
      padding: var(--tg-spacing-1) var(--tg-spacing-4);
      border-radius: 50%;
      transition: all ease .25s;
      background-color: transparent;
      &:hover {
        background-color: var(--tg-secondary-deepdark);
        --tg-icon-color: var(--tg-text-white);
      }
    }
  }
</style>
