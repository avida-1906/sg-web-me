<script setup lang='ts'>
import { EnumsBetSlipTabs } from '~/utils/enums'

const router = useRouter()
const { closeRightSidebar } = useRightSidebar()

const type = ref(EnumsBetSlipTabs.betSlip)
const typeOptions = [
  { label: '投注单', value: EnumsBetSlipTabs.betSlip, num: 5, icon: 'spt-user-bet' },
  { label: '我的投注', value: EnumsBetSlipTabs.myBets, num: 0, icon: 'navbar-user-bet' },
]
// 投注单Tab
const betSlipType = ref<EnumsBetSlipTabs.single | EnumsBetSlipTabs.multi>(
  EnumsBetSlipTabs.single,
)
const betSlipTypeTabs = [
  { label: '单项投注', value: EnumsBetSlipTabs.single, icon: 'navbar-bet' },
  { label: '复式投注', value: EnumsBetSlipTabs.multi, icon: 'navbar-bet-mult' },
]
// 我的投注Tab
const myBetsType = ref(EnumsBetSlipTabs.active)
const myBetsTypeTabs = [
  { label: '活跃', value: EnumsBetSlipTabs.active, icon: 'navbar-active' },
  { label: '已结算', value: EnumsBetSlipTabs.settled, icon: 'navbar-settled' },
]
// 下注选项
const bettingOption = ref('1')
const bettingOptions = [
  { label: '接受任何赔率', value: '1' },
  { label: '只接受更高的赔率', value: '2' },
  { label: '不接受任何赔率更改', value: '3' },
]

const isBetSlip = computed(() => type.value === EnumsBetSlipTabs.betSlip)
const isMyBets = computed(() => type.value === EnumsBetSlipTabs.myBets)
const isBetSingle = computed(() => betSlipType.value === EnumsBetSlipTabs.single)
const isBetMulti = computed(() => betSlipType.value === EnumsBetSlipTabs.multi)
const betBtnText = computed(() =>
  betSlipTypeTabs.find(b => b.value === betSlipType.value)?.label ?? '-')
</script>

<template>
  <div class="app-sports-bet-slip-menu">
    <div class="header">
      <div class="navigation-header">
        <BaseSelect
          v-model="type"
          style="--tg-base-select-hover-bg-color:var(--tg-secondary-dark);
          --tg-base-select-popper-style-padding-x:0;"
          :options="typeOptions" no-hover popper
        >
          <template #label="{ data }">
            <div class="type-select">
              <BaseIcon :name="data?.icon" />
              <span>{{ data?.label }}</span>
              <BaseBadge v-if="data?.num" :count="data?.num" mode="active" />
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
        <BaseButton bg-style="dark" round @click="closeRightSidebar">
          <BaseIcon name="uni-close" />
        </BaseButton>
      </div>
      <div class="tabs">
        <BaseTab v-show="isBetSlip" v-model="betSlipType" :list="betSlipTypeTabs" />
        <BaseTab v-show="isMyBets" v-model="myBetsType" :list="myBetsTypeTabs" />
      </div>
      <div v-show="isBetSlip" class="actions">
        <BaseSelect
          v-model="bettingOption"
          style="--tg-base-select-hover-bg-color:var(--tg-secondary-dark);
          --tg-base-select-popper-style-padding-x:0;
          --tg-base-select-popper-style-padding-y:0;
          --tg-base-select-popper-label-color:var(--tg-text-lightgrey);"
          :options="bettingOptions" no-hover popper
        />
        <BaseButton
          type="text"
          padding0
          style="--tg-base-button-text-default-color:var(--tg-text-white);"
        >
          全部清除
        </BaseButton>
      </div>
    </div>

    <div class="bet-list">
      <div class="scroll-y betlist-scroll">
        <AppSportsBetSlip :bet-slip-type="betSlipType" :index="0" />
        <AppSportsBetSlip :bet-slip-type="betSlipType" :index="1" is-live />
        <AppSportsBetSlip :bet-slip-type="betSlipType" :index="2" error />
        <AppSportsBetSlip
          :bet-slip-type="betSlipType"
          :index="3" disabled is-closed
        />

        <!-- 无数据缺省，不要删！ -->
        <!-- <div class="empty">
          <BaseEmpty>
            <template #icon>
              <BaseIcon
                style="
              font-size: var(--tg-empty-icon-size);
              margin-bottom: var(--tg-spacing-24);"
                name="uni-empty-betslip"
              />
            </template>
            <template #description>
              <span>投注单为空</span>
            </template>
            <template #default>
              <BaseButton
                type="text"
                padding0
                style=" --tg-base-button-text-default-color:var(--tg-text-white)"
                @click="router.push('/sports')"
              >
                立即开始下注！
              </BaseButton>
            </template>
          </BaseEmpty>
        </div> -->
      </div>
    </div>

    <div class="footer">
      <!-- 投注单 -->
      <template v-if="isBetSlip">
        <!-- 复式投注额输入框 -->
        <BaseInput v-show="isBetMulti" type="number" placeholder="0.00000000">
          <template #right-icon>
            <BaseIcon name="coin-btc" />
          </template>
        </BaseInput>
        <div class="betslip-calculation-summary">
          <div v-show="isBetMulti" class="calculation-item">
            <span>总赔率</span>
            <AppSportsOdds odds="1.00" arrow="left" />
          </div>
          <!-- 单式 -->
          <div v-show="isBetSingle" class="calculation-item">
            <span>总投注额</span>
            <AppAmount amount="0.00000000" currency-type="BTC" />
          </div>

          <div class="calculation-item">
            <span>预计支付额</span>
            <AppAmount amount="0.00000000" currency-type="BTC" />
          </div>
        </div>

        <div class="message">
          <div class="icon">
            <BaseIcon class="error-icon" name="uni-warning" />
          </div>
          <span>赔率已更改。</span>
        </div>

        <BaseButton size="md" bg-style="primary">
          押下{{ betBtnText }}
        </BaseButton>
      </template>
      <!-- 我的投注 -->
      <BaseButton v-else size="md" @click="router.push('/sports/my-bets')">
        查看全部
      </BaseButton>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.type-option {
  display: flex;
  align-items: center;
  gap: var(--tg-spacing-8);
}

.app-sports-bet-slip-menu {
  color: var(--tg-text-white);
  font-size: var(--tg-font-size-default);
  height: 100%;
  display: flex;
  flex-direction: column;
}

.header {
  display: grid;
  grid-auto-flow: row;
  place-content: stretch;

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

  .actions {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: var(--tg-spacing-8) var(--tg-spacing-16);
  }
}

.bet-list {
  width: 100%;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  overflow: hidden;

  .betlist-scroll {
    overflow-x: hidden;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    min-height: 0;
    padding: var(--tg-spacing-8) var(--tg-spacing-16) var(--tg-spacing-16);
    overscroll-behavior: contain;
  }

  .empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    justify-content: center;
    min-height: 150px;
  }
}

.footer {
  display: grid;
  padding: var(--tg-spacing-16);
  row-gap: var(--tg-spacing-12);
  background: var(--tg-secondary-grey);
  grid-template-rows: auto;
  grid-auto-flow: row;

  .betslip-calculation-summary {
    display: flex;
    flex-direction: column;

    .calculation-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      line-height: 1.5;

      span {
        color: var(--tg-text-lightgrey);
        font-weight: var(--tg-font-weight-normal);
      }
    }
  }

  .message {
    display: flex;
    align-items: flex-start;
    background-color: var(--tg-secondary-dark);
    padding: var(--tg-spacing-12);
    gap: var(--tg-spacing-12);
    border: 2px dashed;
    border-radius: var(--tg-radius-md);
    border-color: var(--tg-text-error);
    line-height: 1.5;

    .icon {
      margin-top: var(--tg-spacing-3);
      margin-bottom: var(--tg-spacing-3);
      margin-left: var(--tg-spacing-4);
      display: flex;
      align-items: center;
      font-size: var(--tg-font-size-md);
    }

    span {
      font-size: var(--tg-font-size-default);
      color: var(--tg-text-error);
    }
  }
}
</style>
